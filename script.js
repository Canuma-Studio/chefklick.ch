// ChefKlick Website
// Kacheln bewegen sich einmal, wenn sie ins Bild kommen (Entscheid 04.10.2026).
// Den Startzustand setzt eine Zeile im Kopf von index.html (Klasse reveal-ready),
// damit er schon im ersten Bild gilt. Ohne JavaScript oder ohne IntersectionObserver
// fehlt die Klasse und die Kacheln stehen gleich im Endzustand.
(function () {
  var tiles = document.querySelectorAll('[data-reveal]');
  if (!tiles.length || !('IntersectionObserver' in window)) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      observer.unobserve(el);
      // Zwei Bilder warten: sonst sieht der Browser bei einer Kachel, die schon beim
      // Laden im Bild ist, Start und Ende im selben Moment und springt ans Ende.
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { el.classList.add('is-on'); });
      });
    });
  }, { threshold: 0.45 });

  tiles.forEach(function (el) { observer.observe(el); });
})();
