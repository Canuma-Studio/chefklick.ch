// ChefKlick Website
// Kacheln bewegen sich einmal, wenn sie ins Bild kommen (Entscheid 04.10.2026).
// Den Startzustand setzt eine Zeile im Kopf von index.html (Klasse reveal-ready),
// damit er schon im ersten Bild gilt. Ohne JavaScript oder ohne IntersectionObserver
// fehlt die Klasse und die Kacheln stehen gleich im Endzustand.
//
// Ablauf je Kachel: Elemente mit data-at="ms" bekommen zu diesem Zeitpunkt die
// Klasse step-on (das CSS legt fest, was sich dann aendert). Hat ein Element
// zusaetzlich data-type, wird sein Text ab diesem Zeitpunkt Zeichen fuer Zeichen
// geschrieben (data-speed = ms pro Zeichen).
(function () {
  var tiles = document.querySelectorAll('[data-reveal]');
  // Ohne die Klasse (kein IntersectionObserver oder "Bewegung reduzieren") laeuft nichts ab.
  if (!tiles.length || !document.documentElement.classList.contains('reveal-ready')) return;


  // Text, der getippt wird, vorher leeren (die Kacheln liegen beim Laden unter dem Bildrand).
  document.querySelectorAll('[data-type]').forEach(function (el) {
    el.dataset.text = el.textContent;
    el.textContent = '';
  });

  // Monatsuhr (MonthClock.tsx): die Striche bis heute stehen zuerst als Punkt am Innenkreis.
  var INNEN = 78, MITTE = 120;
  var clockLines = document.querySelectorAll('[data-clock] line[data-grow]');
  function setLength(line, r) {
    line.setAttribute('x2', (MITTE + r * +line.dataset.cos).toFixed(2));
    line.setAttribute('y2', (MITTE + r * +line.dataset.sin).toFixed(2));
  }
  clockLines.forEach(function (line) { setLength(line, INNEN); });

  function typeText(el) {
    var text = el.dataset.text || '';
    var speed = +el.dataset.speed || 60;
    var i = 0;
    el.classList.add('typing');
    (function next() {
      i += 1;
      el.textContent = text.slice(0, i);
      if (i < text.length) setTimeout(next, speed);
      else el.classList.remove('typing');
    })();
  }

  // Aufbau wie MonthClock.tsx: 1000 ms, Easing.out(cubic) auf den Gesamtwert,
  // Startzeitpunkte ueber 55 % der Zeit verteilt, bis heute.
  function growClock(tile) {
    var lines = tile.querySelectorAll('line[data-grow]');
    if (!lines.length) return;
    var last = 0;
    lines.forEach(function (l) { last = Math.max(last, +l.dataset.grow); });
    var STAFFELUNG = 0.55, DAUER = 1000, t0 = performance.now();
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

  function run(tile) {
    tile.classList.add('is-on');
    if (tile.hasAttribute('data-clock')) growClock(tile);
    tile.querySelectorAll('[data-at]').forEach(function (el) {
      var go = function () {
        el.classList.add('step-on');
        if (el.hasAttribute('data-type')) typeText(el);
      };
      setTimeout(go, +el.dataset.at);
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      observer.unobserve(el);
      // Zwei Bilder warten: sonst sieht der Browser bei einer Kachel, die schon beim
      // Laden im Bild ist, Start und Ende im selben Moment und springt ans Ende.
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { run(el); });
      });
    });
  }, { threshold: 0.45 });

  tiles.forEach(function (el) { observer.observe(el); });
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
    // Arten: float (Titel), fade (Text), line (Linie zieht sich von links), ring (Ringe hinter dem
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
        else if (type === 'ring') kf = [{ strokeDashoffset: 100 }, { strokeDashoffset: +el.style.getPropertyValue('--to') }];
        else kf = [{ opacity: 0 }, { opacity: 1 }];
        var opts = type === 'ring'
          ? { duration: 1800, delay: delay, easing: 'cubic-bezier(0.33, 1, 0.68, 1)', fill: 'backwards' }
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
