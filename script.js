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
