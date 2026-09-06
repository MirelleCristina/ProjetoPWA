/* =========================================================
   Carousel Boutique — Lógica principal
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollSpy();
  renderServices();
  renderTeam();
  renderReviews();
  renderPromotions();
  renderGallery();
  initBookingForm();
  initServiceFilters();
  initModals();
  initReviewForm();
  initStarRating();
  renderAccount();
  initRescheduleForm();
});

/* ---------------------------------------------------------
   LocalStorage helpers
--------------------------------------------------------- */
const LS_KEYS = {
  bookings: 'cb_bookings',
  reviews: 'cb_reviews',
};

function getBookings() {
  return JSON.parse(localStorage.getItem(LS_KEYS.bookings) || '[]');
}
function saveBookings(arr) {
  localStorage.setItem(LS_KEYS.bookings, JSON.stringify(arr));
}
function getReviews() {
  const stored = localStorage.getItem(LS_KEYS.reviews);
  if (stored) return JSON.parse(stored);
  saveReviews(DEFAULT_REVIEWS);
  return DEFAULT_REVIEWS;
}
function saveReviews(arr) {
  localStorage.setItem(LS_KEYS.reviews, JSON.stringify(arr));
}

function formatBRL(n) {
  return 'R$ ' + n.toFixed(2).replace('.', ',');
}
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ---------------------------------------------------------
   NAVEGAÇÃO
--------------------------------------------------------- */
function initNav() {
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });

  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  function closeMobile() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.mobile-link, .mobile-menu .btn').forEach(link => {
    link.addEventListener('click', closeMobile);
  });
}

function initScrollSpy() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(sec => observer.observe(sec));
}

/* ---------------------------------------------------------
   SERVIÇOS
--------------------------------------------------------- */
function renderServices(filter = 'todos') {
  const grid = document.getElementById('services-grid');
  const list = filter === 'todos' ? SERVICES : SERVICES.filter(s => s.categoria === filter);
  grid.innerHTML = list.map(s => `
    <div class="service-card" data-id="${s.id}">
      <div class="service-icon"><i class="fa-solid ${s.icon}"></i></div>
      <h3>${s.nome}</h3>
      <p class="desc">${s.desc}</p>
      <div class="service-meta">
        <span class="price">${formatBRL(s.preco)}</span>
        <span class="duration"><i class="fa-regular fa-clock"></i> ${s.duracao} min</span>
      </div>
      <button class="btn btn-primary btn-block btn-agendar-servico" data-id="${s.id}">
        <i class="fa-solid fa-calendar-plus"></i> Agendar
      </button>
    </div>
  `).join('');

  grid.querySelectorAll('.btn-agendar-servico').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      document.getElementById('bk-service').value = id;
      document.getElementById('agendamento').scrollIntoView({ behavior: 'smooth' });
      flashElement(document.getElementById('bk-service'));
    });
  });
}

function flashElement(el) {
  el.style.transition = 'box-shadow 0.3s ease';
  el.style.boxShadow = '0 0 0 4px rgba(201,162,77,0.5)';
  setTimeout(() => { el.style.boxShadow = ''; }, 1200);
}

function initServiceFilters() {
  const filterBtns = document.querySelectorAll('#service-filters .filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderServices(btn.getAttribute('data-filter'));
    });
  });
}

/* ---------------------------------------------------------
   PROFISSIONAIS
--------------------------------------------------------- */
function renderTeam() {
  const grid = document.getElementById('team-grid');
  grid.innerHTML = PROFESSIONALS.map(p => `
    <div class="team-card" data-id="${p.id}">
      <div class="team-avatar">
        <img src="images/${p.id === 'sunny' ? 'fluttershy' : p.id === 'roxy' ? 'rainbowdash' : p.id === 'bella' ? 'pinkiepie' : 'twilight'}.jpg" alt="${p.nome}, ${p.especialidade}">
      </div>
      <h3>${p.nome}</h3>
      <p class="team-specialty">${p.especialidade}</p>
      <p class="team-desc">${p.desc}</p>
      <div class="team-stars">${starsHtml(p.nota)} <span>${p.nota.toFixed(1)} (${p.avaliacoes})</span></div>
      <button class="btn btn-outline btn-block btn-ver-perfil" data-id="${p.id}">Ver perfil</button>
    </div>
  `).join('');

  grid.querySelectorAll('.btn-ver-perfil').forEach(btn => {
    btn.addEventListener('click', () => openProModal(btn.getAttribute('data-id')));
  });

  // populate booking select
  const sel = document.getElementById('bk-pro');
  PROFESSIONALS.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `${p.nome} — ${p.especialidade}`;
    sel.appendChild(opt);
  });

  // populate service select
  const serviceSel = document.getElementById('bk-service');
  SERVICES.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = `${s.nome} — ${formatBRL(s.preco)}`;
    serviceSel.appendChild(opt);
  });
}

function starsHtml(nota) {
  const full = Math.round(nota);
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += `<i class="fa-solid fa-star" style="${i <= full ? '' : 'opacity:.3'}"></i>`;
  }
  return html;
}

function openProModal(id) {
  const p = PROFESSIONALS.find(x => x.id === id);
  if (!p) return;
  const content = document.getElementById('pro-modal-content');
  content.innerHTML = `
    <div class="pro-modal-header">
      <div class="pro-modal-avatar">
      <img src="images/${p.id === 'sunny' ? 'fluttershy' : p.id === 'roxy' ? 'rainbowdash' : p.id === 'bella' ? 'pinkiepie' : 'twilight'}.jpg" alt="${p.nome}">
    </div>
      <div>
        <h3>${p.nome}</h3>
        <div class="pro-modal-specialty">${p.especialidade}</div>
        <div class="pro-modal-stars">${starsHtml(p.nota)} <span style="color:var(--text-muted); font-size:0.8rem;">${p.nota.toFixed(1)} (${p.avaliacoes} avaliações)</span></div>
      </div>
    </div>
    <p class="pro-modal-bio">${p.bio}</p>
    <div class="pro-modal-list">
      ${SERVICES.filter(s => matchesSpecialty(p, s)).map(s => `<span>${s.nome}</span>`).join('') || '<span>Consulte todos os serviços</span>'}
    </div>
    <button class="btn btn-primary btn-block" id="modal-agendar-btn" data-id="${p.id}">
      <i class="fa-solid fa-calendar-check"></i> Agendar com ${p.nome}
    </button>
  `;
  document.getElementById('modal-agendar-btn').addEventListener('click', () => {
    document.getElementById('bk-pro').value = p.id;
    closeModal('pro-modal');
    document.getElementById('agendamento').scrollIntoView({ behavior: 'smooth' });
    flashElement(document.getElementById('bk-pro'));
  });
  openModal('pro-modal');
}

function matchesSpecialty(pro, service) {
  const map = {
    sunny: ['corte-feminino', 'escova', 'penteado', 'hidratacao'],
    roxy: ['coloracao', 'mechas'],
    bella: ['manicure', 'pedicure', 'esmaltacao', 'alongamento'],
    luna: ['maquiagem', 'sobrancelhas', 'limpeza-pele'],
  };
  return (map[pro.id] || []).includes(service.id);
}

/* ---------------------------------------------------------
   MODAIS (genérico)
--------------------------------------------------------- */
function initModals() {
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.getAttribute('data-close')));
  });
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(o => closeModal(o.id));
    }
  });
}
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}

/* ---------------------------------------------------------
   AGENDAMENTO — lógica de horários disponíveis
--------------------------------------------------------- */
const ALL_SLOTS = ['09:00','09:30','10:00','10:30','11:00','11:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30'];

function getBookedSlots(dateStr, proId) {
  const bookings = getBookings();
  return bookings
    .filter(b => b.date === dateStr && b.proId === proId && b.status !== 'cancelado')
    .map(b => b.time);
}

function populateTimeSlots(selectEl, dateStr, proId) {
  selectEl.innerHTML = '';
  if (!dateStr) {
    selectEl.innerHTML = '<option value="">Selecione a data primeiro</option>';
    return;
  }
  const date = new Date(dateStr + 'T00:00:00');
  const day = date.getDay();
  const hours = BUSINESS_HOURS[day];

  if (!hours) {
    selectEl.innerHTML = '<option value="">Fechado neste dia — escolha outra data</option>';
    return;
  }

  const booked = proId ? getBookedSlots(dateStr, proId) : [];
  const validSlots = ALL_SLOTS.filter(t => {
    const h = parseInt(t.split(':')[0], 10);
    return h >= hours.abre && h < hours.fecha;
  });

  selectEl.innerHTML = '<option value="">Selecione um horário</option>' +
    validSlots.map(t => {
      const isBooked = booked.includes(t);
      return `<option value="${t}" ${isBooked ? 'disabled' : ''}>${t}${isBooked ? ' (indisponível)' : ''}</option>`;
    }).join('');
}

function initBookingForm() {
  const form = document.getElementById('booking-form');
  const dateInput = document.getElementById('bk-date');
  const timeSelect = document.getElementById('bk-time');
  const proSelect = document.getElementById('bk-pro');

  // limitar data mínima a hoje
  const today = new Date();
  dateInput.min = today.toISOString().split('T')[0];

  function refreshSlots() {
    populateTimeSlots(timeSelect, dateInput.value, proSelect.value);
  }
  dateInput.addEventListener('change', refreshSlots);
  proSelect.addEventListener('change', refreshSlots);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateBookingForm()) {
      showBookingSummary();
    }
  });

  document.getElementById('confirm-booking').addEventListener('click', confirmBooking);
}

function validateBookingForm() {
  let valid = true;
  const fields = [
    { id: 'bk-service', err: 'err-service', msg: 'Selecione um serviço.' },
    { id: 'bk-pro', err: 'err-pro', msg: 'Selecione uma profissional.' },
    { id: 'bk-date', err: 'err-date', msg: 'Selecione uma data.' },
    { id: 'bk-time', err: 'err-time', msg: 'Selecione um horário disponível.' },
    { id: 'bk-name', err: 'err-name', msg: 'Informe seu nome.' },
    { id: 'bk-phone', err: 'err-phone', msg: 'Informe um telefone válido.' },
    { id: 'bk-email', err: 'err-email', msg: 'Informe um e-mail válido.' },
  ];

  fields.forEach(f => {
    const el = document.getElementById(f.id);
    const errEl = document.getElementById(f.err);
    let ok = el.value.trim() !== '';

    if (f.id === 'bk-phone' && ok) {
      ok = /^[\d\s()+-]{8,}$/.test(el.value.trim());
    }
    if (f.id === 'bk-email' && ok) {
      ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim());
    }
    if (f.id === 'bk-date' && ok) {
      const day = new Date(el.value + 'T00:00:00').getDay();
      if (!BUSINESS_HOURS[day]) { ok = false; f.msg = 'Estamos fechados nesse dia. Escolha outra data.'; }
    }

    if (!ok) {
      el.classList.add('invalid');
      errEl.textContent = f.msg;
      valid = false;
    } else {
      el.classList.remove('invalid');
      errEl.textContent = '';
    }
  });

  return valid;
}

function showBookingSummary() {
  const serviceId = document.getElementById('bk-service').value;
  const proId = document.getElementById('bk-pro').value;
  const date = document.getElementById('bk-date').value;
  const time = document.getElementById('bk-time').value;
  const name = document.getElementById('bk-name').value.trim();
  const phone = document.getElementById('bk-phone').value.trim();
  const email = document.getElementById('bk-email').value.trim();

  const service = SERVICES.find(s => s.id === serviceId);
  const pro = PROFESSIONALS.find(p => p.id === proId);
  const [y, m, d] = date.split('-');
  const dateFmt = `${d}/${m}/${y}`;

  document.getElementById('sum-service').textContent = service.nome;
  document.getElementById('sum-pro').textContent = pro.nome;
  document.getElementById('sum-date').textContent = dateFmt;
  document.getElementById('sum-time').textContent = time;
  document.getElementById('sum-price').textContent = formatBRL(service.preco);

  document.getElementById('summary-empty').hidden = true;
  document.getElementById('summary-filled').hidden = false;

  // store pending data
  window._pendingBooking = { serviceId, proId, date, dateFmt, time, name, phone, email, price: service.preco, serviceName: service.nome, proName: pro.nome };

  document.getElementById('booking-summary').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function confirmBooking() {
  const pending = window._pendingBooking;
  if (!pending) return;

  const btn = document.getElementById('confirm-booking');
  const originalHtml = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Confirmando...';

  setTimeout(() => {
    const bookings = getBookings();
    const newBooking = {
      id: 'bk_' + Date.now(),
      serviceId: pending.serviceId,
      serviceName: pending.serviceName,
      proId: pending.proId,
      proName: pending.proName,
      date: pending.date,
      dateFmt: pending.dateFmt,
      time: pending.time,
      name: pending.name,
      phone: pending.phone,
      email: pending.email,
      price: pending.price,
      status: 'confirmado',
    };
    bookings.push(newBooking);
    saveBookings(bookings);

    btn.disabled = false;
    btn.innerHTML = originalHtml;

    showToast('Agendamento confirmado! 💖', 'Esperamos você na Carousel Boutique.');
    resetBookingForm();
    renderAccount();
  }, 900);
}

function resetBookingForm() {
  document.getElementById('booking-form').reset();
  document.getElementById('summary-empty').hidden = false;
  document.getElementById('summary-filled').hidden = true;
  populateTimeSlots(document.getElementById('bk-time'), '', '');
  window._pendingBooking = null;
  document.querySelectorAll('#booking-form .invalid').forEach(el => el.classList.remove('invalid'));
  document.querySelectorAll('#booking-form .error-msg').forEach(el => el.textContent = '');
}

function showToast(title, msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-title').textContent = title;
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4500);
}

/* ---------------------------------------------------------
   MINHA CONTA
--------------------------------------------------------- */
function renderAccount() {
  document.getElementById('acc-name').textContent = CLIENTE.nome;
  document.getElementById('acc-email').textContent = CLIENTE.email;
  document.getElementById('acc-phone').textContent = CLIENTE.telefone;

  const bookings = getBookings().filter(b => b.status !== 'cancelado');
  bookings.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

  const futureContainer = document.getElementById('future-bookings');
  const nextInfo = document.getElementById('acc-next-info');

  if (bookings.length === 0) {
    futureContainer.innerHTML = '<p class="empty-note">Você ainda não possui agendamentos futuros. Que tal agendar agora? ✨</p>';
    nextInfo.textContent = 'Nenhum agendamento futuro.';
  } else {
    const next = bookings[0];
    nextInfo.innerHTML = `<strong>${next.serviceName}</strong> com ${next.proName} — ${next.dateFmt} às ${next.time}`;

    futureContainer.innerHTML = bookings.map(b => `
      <div class="booking-item" data-id="${b.id}">
        <div class="booking-item-info">
          <strong>${b.serviceName} — ${b.proName}</strong>
          <span><i class="fa-regular fa-calendar"></i> ${b.dateFmt} às ${b.time} · ${formatBRL(b.price)}</span>
        </div>
        <div class="booking-item-actions">
          <button class="btn btn-sm btn-ghost btn-remarcar" data-id="${b.id}"><i class="fa-solid fa-calendar-days"></i> Remarcar</button>
          <button class="btn btn-sm btn-danger-ghost btn-cancelar" data-id="${b.id}"><i class="fa-solid fa-xmark"></i> Cancelar</button>
        </div>
      </div>
    `).join('');

    futureContainer.querySelectorAll('.btn-cancelar').forEach(btn => {
      btn.addEventListener('click', () => cancelBooking(btn.getAttribute('data-id')));
    });
    futureContainer.querySelectorAll('.btn-remarcar').forEach(btn => {
      btn.addEventListener('click', () => openRescheduleModal(btn.getAttribute('data-id')));
    });
  }

  // histórico fixo
  const historyContainer = document.getElementById('history-list');
  historyContainer.innerHTML = HISTORICO_SERVICOS.map(h => `
    <div class="history-item">
      <div class="booking-item-info">
        <strong>${h.servico} — ${h.profissional}</strong>
        <span><i class="fa-regular fa-calendar-check"></i> ${h.data} · ${formatBRL(h.valor)}</span>
      </div>
      <span style="color:var(--purple-600); font-weight:600; font-size:0.82rem;"><i class="fa-solid fa-circle-check"></i> Concluído</span>
    </div>
  `).join('');
}

function cancelBooking(id) {
  if (!confirm('Tem certeza que deseja cancelar este agendamento?')) return;
  const bookings = getBookings();
  const idx = bookings.findIndex(b => b.id === id);
  if (idx > -1) {
    bookings[idx].status = 'cancelado';
    saveBookings(bookings);
    renderAccount();
    showToast('Agendamento cancelado', 'Sentiremos sua falta! Volte quando quiser. 💜');
  }
}

let _rescheduleId = null;
function openRescheduleModal(id) {
  _rescheduleId = id;
  const dateInput = document.getElementById('rs-date');
  const today = new Date();
  dateInput.min = today.toISOString().split('T')[0];
  dateInput.value = '';
  document.getElementById('err-rs-date').textContent = '';
  document.getElementById('err-rs-time').textContent = '';
  populateTimeSlots(document.getElementById('rs-time'), '', '');
  openModal('reschedule-modal');
}

function initRescheduleForm() {
  const dateInput = document.getElementById('rs-date');
  const timeSelect = document.getElementById('rs-time');

  dateInput.addEventListener('change', () => {
    const bookings = getBookings();
    const booking = bookings.find(b => b.id === _rescheduleId);
    populateTimeSlots(timeSelect, dateInput.value, booking ? booking.proId : '');
  });

  document.getElementById('reschedule-form').addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    if (!dateInput.value) {
      document.getElementById('err-rs-date').textContent = 'Selecione uma nova data.';
      valid = false;
    } else {
      document.getElementById('err-rs-date').textContent = '';
    }
    if (!timeSelect.value) {
      document.getElementById('err-rs-time').textContent = 'Selecione um novo horário.';
      valid = false;
    } else {
      document.getElementById('err-rs-time').textContent = '';
    }
    if (!valid) return;

    const bookings = getBookings();
    const idx = bookings.findIndex(b => b.id === _rescheduleId);
    if (idx > -1) {
      const [y, m, d] = dateInput.value.split('-');
      bookings[idx].date = dateInput.value;
      bookings[idx].dateFmt = `${d}/${m}/${y}`;
      bookings[idx].time = timeSelect.value;
      saveBookings(bookings);
      renderAccount();
      closeModal('reschedule-modal');
      showToast('Agendamento remarcado! 📅', 'Sua nova data foi confirmada com sucesso.');
    }
  });
}

/* ---------------------------------------------------------
   AVALIAÇÕES
--------------------------------------------------------- */
function renderReviews() {
  const reviews = getReviews();
  const grid = document.getElementById('reviews-grid');
  grid.innerHTML = reviews.map(r => `
    <div class="review-card">
      <div class="review-stars">${starsHtml(r.nota)}</div>
      <p class="review-comment">"${escapeHtml(r.comentario)}"</p>
      <div class="review-footer">
        <div class="review-avatar">${escapeHtml(r.nome.charAt(0))}</div>
        <div>
          <div class="review-name">${escapeHtml(r.nome)}</div>
          <div class="review-date">${r.data}</div>
        </div>
      </div>
    </div>
  `).join('');
}

let _selectedStar = 0;
function initStarRating() {
  const stars = document.querySelectorAll('#star-rating i');
  stars.forEach(star => {
    star.addEventListener('click', () => {
      _selectedStar = parseInt(star.getAttribute('data-val'), 10);
      updateStarDisplay();
    });
    star.addEventListener('mouseenter', () => {
      const val = parseInt(star.getAttribute('data-val'), 10);
      stars.forEach(s => {
        s.classList.toggle('fa-solid', parseInt(s.getAttribute('data-val'), 10) <= val);
        s.classList.toggle('fa-regular', parseInt(s.getAttribute('data-val'), 10) > val);
      });
    });
  });
  document.getElementById('star-rating').addEventListener('mouseleave', updateStarDisplay);
}
function updateStarDisplay() {
  const stars = document.querySelectorAll('#star-rating i');
  stars.forEach(s => {
    const val = parseInt(s.getAttribute('data-val'), 10);
    s.classList.toggle('fa-solid', val <= _selectedStar);
    s.classList.toggle('fa-regular', val > _selectedStar);
    s.classList.toggle('active', val <= _selectedStar);
  });
}

function initReviewForm() {
  document.getElementById('open-review-modal').addEventListener('click', () => {
    document.getElementById('review-form').reset();
    _selectedStar = 0;
    updateStarDisplay();
    document.querySelectorAll('#review-form .error-msg').forEach(e => e.textContent = '');
    openModal('review-modal');
  });

  document.getElementById('review-form').addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    const name = document.getElementById('rv-name').value.trim();
    const comment = document.getElementById('rv-comment').value.trim();

    if (!name) { document.getElementById('err-rv-name').textContent = 'Informe seu nome.'; valid = false; }
    else document.getElementById('err-rv-name').textContent = '';

    if (_selectedStar === 0) { document.getElementById('err-rv-star').textContent = 'Selecione uma nota de 1 a 5.'; valid = false; }
    else document.getElementById('err-rv-star').textContent = '';

    if (!comment) { document.getElementById('err-rv-comment').textContent = 'Escreva um comentário.'; valid = false; }
    else document.getElementById('err-rv-comment').textContent = '';

    if (!valid) return;

    const reviews = getReviews();
    const today = new Date();
    const dateStr = `${String(today.getDate()).padStart(2,'0')}/${String(today.getMonth()+1).padStart(2,'0')}/${today.getFullYear()}`;
    reviews.unshift({ nome: name, nota: _selectedStar, comentario: comment, data: dateStr });
    saveReviews(reviews);
    renderReviews();
    closeModal('review-modal');
    showToast('Avaliação enviada! 🌟', 'Obrigada por compartilhar sua experiência com a gente.');
  });
}

/* ---------------------------------------------------------
   PROMOÇÕES
--------------------------------------------------------- */
function renderPromotions() {
  const grid = document.getElementById('promo-grid');
  grid.innerHTML = PROMOTIONS.map(p => `
    <div class="promo-card">
      <div class="promo-icon"><i class="fa-solid ${p.icon}"></i></div>
      <h3>${p.titulo}</h3>
      <div class="promo-highlight">${p.destaque}</div>
      <p class="desc">${p.desc}</p>
      <button class="btn btn-outline btn-block btn-promo" data-id="${p.id}">Aproveitar oferta</button>
    </div>
  `).join('');

  grid.querySelectorAll('.btn-promo').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('agendamento').scrollIntoView({ behavior: 'smooth' });
      showToast('Oferta selecionada! ✨', 'Finalize seu agendamento para aproveitar a promoção.');
    });
  });
}

/* ---------------------------------------------------------
   GALERIA
--------------------------------------------------------- */
function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = GALLERY.map((g, i) => `
    <div class="gallery-item ${g.img ? '' : g.grad} ${i === 0 || i === 5 ? 'big' : ''}" data-id="${g.id}" data-title="${g.titulo}">
      ${g.img
        ? `<img src="${g.img}" alt="${g.titulo}" class="gallery-item-photo">`
        : `<i class="fa-solid ${g.icon}"></i>`}
    </div>
  `).join('');

  grid.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const id = item.getAttribute('data-id');
      const g = GALLERY.find(x => x.id === id);
      document.getElementById('gallery-modal-content').innerHTML = g.img
        ? `
        <div class="gallery-modal-img gallery-modal-photo">
          <img src="${g.img}" alt="${g.titulo}">
          <span>${g.titulo}</span>
        </div>
      `
        : `
        <div class="gallery-modal-img ${g.grad}">
          <i class="fa-solid ${g.icon}"></i>
          <span>${g.titulo}</span>
        </div>
      `;
      openModal('gallery-modal');
    });
  });
}
