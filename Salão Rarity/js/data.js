/* =========================================================
   Carousel Boutique — dados fictícios (mock data)
   ========================================================= */

// ---------- Serviços ----------
const SERVICES = [
  // Cabelo
  { id: 'corte-feminino', categoria: 'cabelo', nome: 'Corte feminino', desc: 'Corte personalizado para valorizar seu estilo.', preco: 60, duracao: 60, icon: 'fa-scissors' },
  { id: 'escova', categoria: 'cabelo', nome: 'Escova', desc: 'Escova modeladora com toque de brilho.', preco: 45, duracao: 45, icon: 'fa-wind' },
  { id: 'hidratacao', categoria: 'cabelo', nome: 'Hidratação', desc: 'Nutrição profunda para fios macios e saudáveis.', preco: 50, duracao: 40, icon: 'fa-droplet' },
  { id: 'coloracao', categoria: 'cabelo', nome: 'Coloração', desc: 'Cor uniforme e vibrante do jeitinho que você sonha.', preco: 120, duracao: 120, icon: 'fa-palette' },
  { id: 'mechas', categoria: 'cabelo', nome: 'Mechas', desc: 'Iluminado e dimensão para um visual encantador.', preco: 180, duracao: 180, icon: 'fa-wand-magic-sparkles' },
  { id: 'penteado', categoria: 'cabelo', nome: 'Penteado', desc: 'Penteados elegantes para ocasiões especiais.', preco: 80, duracao: 60, icon: 'fa-crown' },
  // Unhas
  { id: 'manicure', categoria: 'unhas', nome: 'Manicure', desc: 'Cuidado completo para unhas impecáveis.', preco: 30, duracao: 40, icon: 'fa-hand-sparkles' },
  { id: 'pedicure', categoria: 'unhas', nome: 'Pedicure', desc: 'Pés renovados com todo o carinho.', preco: 35, duracao: 45, icon: 'fa-shoe-prints' },
  { id: 'esmaltacao', categoria: 'unhas', nome: 'Esmaltação', desc: 'Cor perfeita e acabamento duradouro.', preco: 20, duracao: 30, icon: 'fa-fill-drip' },
  { id: 'alongamento', categoria: 'unhas', nome: 'Alongamento', desc: 'Unhas alongadas com design à sua escolha.', preco: 100, duracao: 120, icon: 'fa-gem' },
  // Estética
  { id: 'sobrancelhas', categoria: 'estetica', nome: 'Design de sobrancelhas', desc: 'Olhar marcante com design sob medida.', preco: 30, duracao: 30, icon: 'fa-eye' },
  { id: 'maquiagem', categoria: 'estetica', nome: 'Maquiagem', desc: 'Make elegante para brilhar em qualquer evento.', preco: 90, duracao: 60, icon: 'fa-brush' },
  { id: 'limpeza-pele', categoria: 'estetica', nome: 'Limpeza de pele', desc: 'Pele renovada, leve e radiante.', preco: 80, duracao: 60, icon: 'fa-spa' },
];

// ---------- Profissionais ----------
const PROFESSIONALS = [
  {
    id: 'sunny',
    nome: 'Fluttershy',
    especialidade: 'Cortes & Penteados',
    desc: 'Com seu jeito doce, paciente e cuidadoso, Fluttershy transforma cada sessão em um verdadeiro momento de relaxamento.',
    bio: 'Ela acredita que toda beleza deve respeitar sua essência — e, francamente, seu cabelo merece esse carinho. Além disso, ela é tão delicada que provavelmente pediria desculpas ao cabelo antes de cortar uma ponta.',
    nota: 4.9,
    avaliacoes: 128,
    cor1: '#caa6e6', cor2: '#8a4fc4', tom: 'Fluttershy'
  },
  {
    id: 'roxy',
    nome: 'Rainbow Dash',
    especialidade: 'Coloração & Mechas',
    desc: 'Ousada, confiante e sempre pronta para ir além, Rainbow Dash nasceu para transformar cabelos comuns em algo impossível de ignorar.',
    bio: 'Rainbow Dash ama criar tons únicos que refletem a personalidade de cada cliente. Se você quer algo discreto... bem, talvez ela não seja sua primeira escolha. Mas, sinceramente, quem quer ser discreta?',
    nota: 5.0,
    avaliacoes: 154,
    cor1: '#b98ce0', cor2: '#5b2079', tom: 'Rainbow Dash'
  },
  {
    id: 'bella',
    nome: 'Pinkie Pie',
    especialidade: 'Manicure & Nail Art',
    desc: 'Pinkie Pie transforma cada unha em uma pequena celebração. Cores, desenhos, brilhos... quanto mais alegre, melhor! E sim, ela adora uma fofoquinha.',
    bio: 'Se você consegue imaginar uma decoração para suas unhas, Pinkie provavelmente já fez — e adicionou glitter.',
    nota: 4.8,
    avaliacoes: 96,
    cor1: '#e6c9f2', cor2: '#a566c9', tom: 'Pinkie Pie'
  },
  {
    id: 'luna',
    nome: 'Twilight',
    especialidade: 'Maquiagem & Sobrancelhas',
    desc: 'Inteligente, dedicada e extremamente atenta aos detalhes, Twilight estuda cada traço, cada tom e cada combinação.',
    bio: 'Ela analisará seu rosto, sua paleta de cores e provavelmente fará algumas anotações. Não se preocupe, querida, é tudo parte do processo.',
    nota: 4.9,
    avaliacoes: 112,
    cor1: '#d6b3ea', cor2: '#4a1666', tom: 'Twilight'
  },
];

// ---------- Avaliações padrão ----------
const DEFAULT_REVIEWS = [

  { nome: 'Applejack', nota: 5, comentario: 'Serviço caprichado, gente honesta e resultado que vale cada centavo. Pode confiar!', data: '12/08/2026' },

  { nome: 'Princesa Celestia', nota: 5, comentario: 'Uma experiência encantadora! Cada detalhe foi pensado para nos fazer sentir verdadeiramente especiais.', data: '05/08/2026' },

  { nome: 'Spike', nota: 5, comentario: 'Eu estava meio nervoso, mas ficou MUITO melhor do que esperava! E olha que eu entendo de estilo.', data: '30/07/2026' },

  { nome: 'Sunset Shimmer', nota: 4.5, comentario: 'Cheguei um pouco desconfiada, mas saí muito mais confiante. O resultado ficou incrível!', data: '22/07/2026' },

  { nome: 'Starlight Glimmer', nota: 5, comentario: 'Eu tinha planejado reclamar de pelo menos três coisas. Não precisei. Estou impressionada.', data: '15/07/2026' },

];

// ---------- Promoções ----------
const PROMOTIONS = [
  { id: 'primeira-visita', titulo: 'Primeira visita', destaque: '10% OFF', desc: 'Um desconto especial de boas-vindas para você conhecer nosso universo de beleza.', icon: 'fa-star' },
  { id: 'combo-beauty', titulo: 'Combo Beauty', destaque: 'Cabelo + Manicure', desc: 'Combine dois cuidados essenciais e saia impecável dos fios às pontas, afinal, glamour nunca é demais.', icon: 'fa-gift' },
  { id: 'aniversariante', titulo: 'Aniversariante', destaque: '20% OFF', desc: 'Durante o mês do seu aniversário, comemore com um desconto exclusivo da casa.', icon: 'fa-cake-candles' },
];

// ---------- Galeria ----------
const GALLERY = [
  { id: 'g1', categoria: 'cortes', titulo: 'Cortes com personalidade', icon: 'fa-scissors', grad: 'grad-1', img: 'images/corteflut.jpg' },
  { id: 'g2', categoria: 'penteados', titulo: 'Penteados de encantar', icon: 'fa-crown', grad: 'grad-2', img: 'images/penteadoflut.jpg' },
  { id: 'g3', categoria: 'unhas', titulo: 'Nail art delicada', icon: 'fa-hand-sparkles', grad: 'grad-3', img: 'images/nailpinkie.jpg' },
  { id: 'g4', categoria: 'maquiagem', titulo: 'Make de brilhar', icon: 'fa-brush', grad: 'grad-4', img: 'images/maketwi.jpg' },
  { id: 'g5', categoria: 'antes-depois', titulo: 'Antes & Depois', icon: 'fa-arrows-rotate', grad: 'grad-5', img: 'images/antesdepois.jpg' },
  { id: 'g6', categoria: 'ambiente', titulo: 'Nosso espaço boutique', icon: 'fa-store', grad: 'grad-6', img: 'images/salao.jpg' },
  { id: 'g7', categoria: 'cortes', titulo: 'Coloração dos sonhos', icon: 'fa-palette', grad: 'grad-7', img: 'images/coloracao.jpg' },
  { id: 'g8', categoria: 'penteados', titulo: 'Styling com flores', icon: 'fa-spa', grad: 'grad-8', img: 'images/flores.jpg' }
];

// ---------- Histórico fictício (Minha Conta) ----------
const CLIENTE = {
  nome: 'Cristina',
  telefone: '(11) 98888-1234',
  email: 'cris.tina@example.com',
};

const HISTORICO_SERVICOS = [
  { servico: 'Hidratação', profissional: 'Fluttershy', data: '02/06/2026', valor: 50 },
  { servico: 'Design de sobrancelhas', profissional: 'Twilight', data: '18/06/2026', valor: 30 },
  { servico: 'Manicure', profissional: 'Pinkie Pie', data: '10/07/2026', valor: 30 },
  { servico: 'Mechas', profissional: 'Rainbow Dash', data: '28/07/2026', valor: 180 },
];

// ---------- Horário de funcionamento ----------
const BUSINESS_HOURS = {
  0: null, // domingo - fechado
  1: { abre: 9, fecha: 19 },
  2: { abre: 9, fecha: 19 },
  3: { abre: 9, fecha: 19 },
  4: { abre: 9, fecha: 19 },
  5: { abre: 9, fecha: 19 },
  6: { abre: 9, fecha: 17 },
};
