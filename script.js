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

// Kopf und Einstieg (Entscheid 04.10.2026: Mischung aus "Wie der App-Start" und "Schwebende Leiste").
(function () {
  var header = document.getElementById('site-header');
  var mark = document.getElementById('bigmark');

  // Kleine Marke in der Leiste erst zeigen, wenn die grosse Wortmarke aus dem Bild ist.
  if (header && mark && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      header.classList.toggle('brand-hidden', entries[0].isIntersecting);
    }, { rootMargin: '-80px 0px 0px 0px' }).observe(mark);
  }

  // Aktiver Bereich in der Leiste, wie der aktive Reiter in der App.
  var links = document.querySelectorAll('.site-nav a[data-spy]');
  if (links.length && 'IntersectionObserver' in window) {
    var targets = [];
    links.forEach(function (a) {
      var id = a.dataset.spy;
      var el = id === 'top' ? document.querySelector('.opener-band') : document.getElementById(id);
      if (el) targets.push({ el: el, link: a });
    });
    var setActive = function () {
      var line = window.innerHeight * 0.35, current = targets[0];
      targets.forEach(function (t) { if (t.el.getBoundingClientRect().top <= line) current = t; });
      links.forEach(function (a) { a.classList.toggle('is-active', a === current.link); });
    };
    window.addEventListener('scroll', setActive, { passive: true });
    window.addEventListener('resize', setActive);
    setActive();
  }

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
