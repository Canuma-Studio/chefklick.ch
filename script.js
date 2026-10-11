// ChefKlick Website
// Kacheln: der Ablauf aus der App laeuft in Schleife, solange die Kachel im Bild ist, unabhaengig
// vom Scrollen (Entscheid 11.10.2026, ersetzt "einmal beim Sichtbarwerden" vom 04.10.2026).
// Die Kachel hat von Anfang an die Hoehe ihres Endzustands, damit beim Ablauf nichts darunter
// rutscht. Den Startzustand setzt eine Zeile im Kopf von index.html (Klasse reveal-ready), damit er
// schon im ersten Bild gilt. Ohne JavaScript oder ohne IntersectionObserver fehlt die Klasse und die
// Kacheln stehen gleich im Endzustand.
//
// Ablauf je Kachel: Elemente mit data-at="ms" bekommen zu diesem Zeitpunkt die Klasse step-on (das
// CSS legt fest, was sich dann aendert). Hat ein Element zusaetzlich data-type, wird sein Text ab
// diesem Zeitpunkt Zeichen fuer Zeichen geschrieben (data-speed = ms pro Zeichen). Alle Zeiten werden
// mit TEMPO gestreckt (langsamer, Entscheid 11.10.2026).
(function () {
  var tiles = document.querySelectorAll('[data-reveal]');
  // Ohne die Klasse (kein IntersectionObserver oder "Bewegung reduzieren") laeuft nichts ab.
  if (!tiles.length || !document.documentElement.classList.contains('reveal-ready')) return;

  var TEMPO = 1.8;      // Faktor auf data-at und data-speed
  var HALTEN = 6000;    // so lange steht der Endzustand
  var AUS = 800;        // Ausblenden vor dem Neustart (gleich wie .tile.fading im CSS)
  var PAUSE = 900;      // leer, bevor es wieder beginnt

  // Getippter Text: Endtext merken
  document.querySelectorAll('[data-type]').forEach(function (el) { el.dataset.text = el.textContent; });

  // Monatsuhr (MonthClock.tsx): die Striche bis heute stehen zuerst als Punkt am Innenkreis.
  var INNEN = 78, MITTE = 120;
  function setLength(line, r) {
    line.setAttribute('x2', (MITTE + r * +line.dataset.cos).toFixed(2));
    line.setAttribute('y2', (MITTE + r * +line.dataset.sin).toFixed(2));
  }

  // Aufbau wie MonthClock.tsx: 1000 ms, Easing.out(cubic) auf den Gesamtwert,
  // Startzeitpunkte ueber 55 % der Zeit verteilt, bis heute.
  function growClock(tile) {
    var lines = tile.querySelectorAll('line[data-grow]');
    if (!lines.length) return;
    var last = 0;
    lines.forEach(function (l) { last = Math.max(last, +l.dataset.grow); });
    var STAFFELUNG = 0.55, DAUER = 1000 * TEMPO, t0 = performance.now();
    (function frame(now) {
      var t = Math.min(1, (now - t0) / DAUER);
      var k = 1 - Math.pow(1 - t, 3);
      lines.forEach(function (l) {
        var start = last > 0 ? (+l.dataset.grow / last) * STAFFELUNG : 0;
        var p = Math.max(0, Math.min(1, (k - start) / (1 - STAFFELUNG)));
        setLength(l, INNEN + (+l.dataset.out - INNEN) * p);
      });
      if (t < 1) requestAnimationFrame(frame);
    })(t0);
  }

  // Zustand setzen: Start (leer) oder Ende (alles da). Ohne Uebergaenge (Klasse resetting).
  function setState(tile, end) {
    tile.classList.add('resetting');
    tile.querySelectorAll('[data-at]').forEach(function (el) { el.classList.toggle('step-on', end); });
    tile.querySelectorAll('[data-type]').forEach(function (el) { el.textContent = end ? el.dataset.text : ''; el.classList.remove('typing'); });
    tile.querySelectorAll('line[data-grow]').forEach(function (l) { setLength(l, end ? +l.dataset.out : INNEN); });
    tile.classList.toggle('is-on', end);
    tile.offsetHeight; // Zustand sofort anwenden
    tile.classList.remove('resetting');
  }

  // Hoehe des Endzustands messen und als Mindesthoehe setzen
  function fit(tile) {
    if (tile._busy) return; // waehrend des Ablaufs nicht messen
    tile.style.minHeight = '';
    setState(tile, true);
    tile.style.minHeight = Math.ceil(tile.getBoundingClientRect().height) + 'px';
    setState(tile, false);
  }

  function typeText(tile, el) {
    var text = el.dataset.text || '', speed = (+el.dataset.speed || 60) * TEMPO, i = 0;
    el.classList.add('typing');
    (function next() {
      i += 1;
      el.textContent = text.slice(0, i);
      if (i < text.length) tile._timers.push(setTimeout(next, speed));
      else el.classList.remove('typing');
    })();
  }

  function later(tile, ms, fn) { tile._timers.push(setTimeout(fn, ms)); }

  // Ein Durchgang: Ablauf, Endzustand halten, ausblenden, leeren, neu beginnen (nur wenn sichtbar)
  function cycle(tile) {
    tile._busy = true;
    tile._timers = [];
    tile.classList.add('is-on');
    if (tile.hasAttribute('data-clock')) growClock(tile);
    var end = tile.hasAttribute('data-clock') ? 1000 * TEMPO : 0;
    tile.querySelectorAll('[data-at]').forEach(function (el) {
      var at = +el.dataset.at * TEMPO;
      var dur = el.hasAttribute('data-type') ? (el.dataset.text || '').length * (+el.dataset.speed || 60) * TEMPO : 400;
      end = Math.max(end, at + dur);
      later(tile, at, function () {
        el.classList.add('step-on');
        if (el.hasAttribute('data-type')) typeText(tile, el);
      });
    });
    later(tile, end + HALTEN, function () {
      tile.classList.add('fading');
      later(tile, AUS, function () {
        setState(tile, false);
        tile.classList.remove('fading');
        tile._busy = false;
        if (tile._visible) later(tile, PAUSE, function () { if (tile._visible && !tile._busy) cycle(tile); });
      });
    });
  }

  tiles.forEach(function (tile) { tile._timers = []; fit(tile); });
  // Schrift kann die Hoehe noch aendern: nach dem Laden der Schriften nochmals messen
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { tiles.forEach(fit); });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var tile = entry.target;
      tile._visible = entry.isIntersecting;
      // Laeuft schon ein Durchgang, endet er von selbst; danach startet nur ein sichtbare Kachel neu.
      if (tile._visible && !tile._busy) {
        // Zwei Bilder warten: sonst sieht der Browser Start und Ende im selben Moment.
        requestAnimationFrame(function () { requestAnimationFrame(function () { if (!tile._busy) cycle(tile); }); });
      }
    });
  }, { threshold: 0.3 });
  tiles.forEach(function (el) { observer.observe(el); });

  var wait;
  window.addEventListener('resize', function () {
    clearTimeout(wait);
    wait = setTimeout(function () { tiles.forEach(fit); }, 200);
  });
})();

// Menue: nur ein Symbol oben rechts wie bei der Vorlage (Entscheid 04.10.2026).
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('menu-toggle'), menu = document.getElementById('menu');
  if (!btn || !menu) return;
  function set(open) {
    root.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Menü schliessen' : 'Menü öffnen');
    if (open) menu.querySelector('a').focus();
  }
  btn.addEventListener('click', function () { set(!root.classList.contains('menu-open')); });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && root.classList.contains('menu-open')) { set(false); btn.focus(); }
  });
})();

// Bewegung wie bei der Vorlage: Titel (data-m="float") schweben 60 px herein, Texte
// (data-m="fade") blenden ein, 1200 ms, am Handy 600 ms. Die Ringe hinter dem
// Zwischentitel (data-fixed) stehen still.
(function () {
  if (!document.documentElement.classList.contains('reveal-ready')) return;
  var EASE = 'cubic-bezier(0.445, 0.05, 0.55, 0.95)';
  var items = document.querySelectorAll('[data-m]');
  if (!Element.prototype.animate) {
    items.forEach(function (el) { el.classList.add('m-done'); });
  } else {
    // Arten: float (Titel), fade (Text), reveal (Kachel-Flaeche wird aufgedeckt), line (Linie zieht sich von links), ring (Ringe hinter dem
    // Zwischentitel fuellen sich wie DayRings.tsx), row (Grundsatz: Linie, dann Titel, dann Text).
    // Was gleichzeitig ins Bild kommt, startet gestaffelt; data-delay verschiebt zusaetzlich.
    var io = new IntersectionObserver(function (entries) {
      var dur = window.innerWidth < 750 ? 600 : 1200, k = dur / 1200, batch = 0;
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, type = el.dataset.m;
        io.unobserve(el);
        var delay = (batch++ * 150 + (+el.dataset.delay || 0)) * k;
        el.classList.add('m-done');
        if (type === 'row') {
          el.style.setProperty('--dur', dur + 'ms');
          el.style.setProperty('--d', delay + 'ms');
          var h = el.querySelector('h3'), t = el.querySelector('p');
          if (h) h.animate([{ opacity: 0, transform: 'translateY(30px)' }, { opacity: 1, transform: 'none' }], { duration: dur, delay: delay + 250 * k, easing: EASE, fill: 'backwards' });
          if (t) t.animate([{ opacity: 0 }, { opacity: 1 }], { duration: dur, delay: delay + 450 * k, easing: EASE, fill: 'backwards' });
          return;
        }
        var kf;
        if (type === 'float') kf = [{ opacity: 0, transform: 'translateY(60px)' }, { opacity: 1, transform: 'none' }];
        else if (type === 'line') kf = [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }];
        else if (type === 'reveal') kf = [{ clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0 0 0 0)' }];
        else if (type === 'ring') kf = [{ strokeDashoffset: 100 }, { strokeDashoffset: +el.style.getPropertyValue('--to') }];
        else kf = [{ opacity: 0 }, { opacity: 1 }];
        // reveal: Flaeche der Kachel wird von unten nach oben aufgedeckt wie die Bilder der Vorlage
        // (motion-revealIn, 1200 ms, cubic-bezier(0.645, 0.045, 0.355, 1)), Entscheid 11.10.2026
        var opts = type === 'ring'
          ? { duration: 1800, delay: delay, easing: 'cubic-bezier(0.33, 1, 0.68, 1)', fill: 'backwards' }
          : type === 'reveal'
            ? { duration: dur, delay: delay, easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)', fill: 'backwards' }
            : { duration: dur, delay: delay, easing: EASE, fill: 'backwards' };
        el.animate(kf, opts);
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
  }

  // Die Ringe hinter dem Zwischentitel (data-fixed) stehen beim Scrollen still.
  // Mitlaufen der Kacheln entfernt (Entscheid 05.10.2026: zu verspielt).
  var fixed = document.querySelectorAll('[data-fixed]'), waiting = false;
  function update() {
    waiting = false;
    var h = window.innerHeight;
    fixed.forEach(function (el) {
      var r = el.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > h) return;
      el.style.transform = 'translateY(' + (-r.top + (h - r.height) / 2).toFixed(1) + 'px)';
    });
  }
  window.addEventListener('scroll', function () {
    if (!waiting) { waiting = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

// Wortmarke im Einstieg wie beim Start der App (Entscheid 04.10.2026).
(function () {
  var mark = document.getElementById('bigmark');
  // Wortmarke wie components/ChefKlickLogo.tsx: Buchstaben im Abstand von 90 ms, je 260 ms,
  // 200 ms Pause vor "Klick"; dann faellt der i-Punkt (420 ms) und huepft dreimal
  // (0.55 / 0.28 / 0.12 der Schriftgroesse). Punkt 0.20, Abdeckung 0.28 der Schriftgroesse,
  // Punktmitte 700 Units ueber der Grundlinie.
  if (!mark || !document.documentElement.classList.contains('reveal-ready')) return;
  var iw = mark.querySelector('.iw'), base = iw.querySelector('.baseline');
  var cover = iw.querySelector('.dot-cover'), dot = iw.querySelector('.dot');
  if (!mark.animate) {
    // Ohne Web Animations: Wortmarke einfach zeigen, mit dem echten i-Punkt der Schrift.
    cover.remove(); dot.remove();
    mark.querySelectorAll('.l').forEach(function (l) { l.style.opacity = 1; });
    return;
  }

  function placeDot() {
    var fs = parseFloat(getComputedStyle(mark).fontSize);
    var box = iw.getBoundingClientRect(), bl = base.getBoundingClientRect();
    var cx = box.width / 2, cy = (bl.top - box.top) - 0.70 * fs;
    [[cover, 0.28], [dot, 0.20]].forEach(function (p) {
      var d = fs * p[1];
      p[0].style.width = d + 'px'; p[0].style.height = d + 'px';
      p[0].style.left = (cx - d / 2) + 'px'; p[0].style.top = (cy - d / 2) + 'px';
    });
    return fs;
  }

  function play() {
    var fs = placeDot();
    var letters = mark.querySelectorAll('.l'), end = 0;
    letters.forEach(function (l, i) {
      var delay = 150 + i * 90 + (i >= 4 ? 200 : 0);
      l.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, delay: delay, fill: 'both' });
      end = Math.max(end, delay + 260);
    });
    var fall = -(mark.getBoundingClientRect().bottom + 40);
    var b1 = -fs * 0.55, b2 = -fs * 0.28, b3 = -fs * 0.12;
    var steps = [[fall, 0, 420, 'ease-in'], [0, b1, 180, 'ease-out'], [b1, 0, 180, 'ease-in'],
      [0, b2, 130, 'ease-out'], [b2, 0, 130, 'ease-in'], [0, b3, 90, 'ease-out'], [b3, 0, 90, 'ease-in']];
    var total = 0; steps.forEach(function (s) { total += s[2]; });
    var t = 0, frames = [{ transform: 'translateY(' + fall + 'px)', offset: 0, easing: 'ease-in' }];
    steps.forEach(function (s, i) {
      t += s[2];
      frames.push({ transform: 'translateY(' + s[1] + 'px)', offset: t / total, easing: steps[i + 1] ? steps[i + 1][3] : 'linear' });
    });
    dot.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1, delay: end, fill: 'both' });
    dot.animate(frames, { duration: total, delay: end, fill: 'both' });
  }

  var ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  ready.then(play);
  window.addEventListener('resize', placeDot);
})();
