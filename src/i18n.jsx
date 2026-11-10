import { createContext, useContext, useMemo, useState } from 'react';

const translations = {
  en: {
    nav: { home: 'Home', tech: 'Stack', about: 'About', projects: 'Projects', contact: 'Contact', talk: 'Let’s talk', menu: 'Toggle menu', top: 'Go to top', language: 'Choose language', light: 'Switch to light theme', dark: 'Switch to dark theme' },
    hero: { available: 'AVAILABLE FOR NEW PROJECTS', kicker: 'HELLO, I’M ISMOIL IBRAHIMOV', leadA: 'I build digital', leadB: 'experiences', leadC: 'that', leadD: 'matter', description: 'Frontend developer focused on crafting clean, responsive and engaging web experiences. I turn ideas into thoughtful interfaces with modern technologies.', explore: 'Explore my work', getInTouch: 'Get in touch', scroll: 'SCROLL TO DISCOVER' },
    tech: { label: '01 — TOOLKIT', titleA: 'Tools of the', titleB: 'trade.', description: 'A selection of technologies I use to bring ideas to life.' },
    about: { label: '02 — A LITTLE ABOUT ME', titleA: 'Curious mind.', titleB: 'Builder’s mindset.', lead: 'I’m a frontend developer who enjoys turning ideas into clean, useful digital experiences.', description: 'I focus on thoughtful interfaces, responsive layouts and reliable integrations. I’m always learning, experimenting with new tools and improving the way I build for the web.', explore: 'Explore my work', highlights: [['Frontend development', 'Building responsive interfaces with modern web technologies.'], ['Full-stack mindset', 'Connecting user experiences with APIs and content management.'], ['Responsive by design', 'Making websites feel natural on phones, tablets and desktops.']] },
    projects: { label: '03 — SELECTED WORK', titleA: 'Things I’ve', titleB: 'built.', description: 'A few projects where design meets development.', count: 'PROJECTS', filters: 'Filter projects by technology', previous: 'Previous projects', next: 'Next projects', view: 'VIEW PROJECT', details: 'Details', source: 'Source code', overview: 'PROJECT OVERVIEW', more: 'More details about this project will be added soon.', live: 'Live preview', unavailable: 'Projects are temporarily unavailable', retry: 'Please check back in a little while.', empty: 'No projects in this category', filterHint: 'Try another technology filter.', close: 'Close project details', all: 'All' },
    contact: { label: '04 — GET IN TOUCH', titleA: 'Have a project in', titleB: 'mind?', description: 'Have an idea, a question, or just want to say hello? My inbox is open.', note: 'Let’s create something meaningful.', turn: 'Let’s turn your', idea: 'idea into reality.', email: 'Send me an email', resume: 'Download resume', formTitle: 'Send a message', name: 'Your name', emailLabel: 'Email address', message: 'Your message', namePlaceholder: 'John Doe', emailPlaceholder: 'john@example.com', messagePlaceholder: 'Tell me a little about your project…', send: 'Send message', sending: 'Sending…', sent: 'Message sent. Thanks for reaching out!', failed: 'Could not send your message. Please try again later.' },
    footer: { made: 'Designed & built with care.', top: 'Back to top' },
  },
  ru: {
    nav: { home: 'Главная', tech: 'Навыки', about: 'Обо мне', projects: 'Проекты', contact: 'Контакты', talk: 'Связаться', menu: 'Открыть меню', top: 'Наверх', language: 'Выбрать язык', light: 'Включить светлую тему', dark: 'Включить тёмную тему' },
    hero: { available: 'ОТКРЫТ К НОВЫМ ПРОЕКТАМ', kicker: 'ПРИВЕТ, Я ИСМОИЛ ИБРАГИМОВ', leadA: 'Я создаю цифровые', leadB: 'впечатления', leadC: 'со', leadD: 'смыслом', description: 'Frontend-разработчик. Создаю чистые, адаптивные и удобные веб-интерфейсы, превращая идеи в продуманные цифровые продукты с помощью современных технологий.', explore: 'Мои проекты', getInTouch: 'Связаться', scroll: 'ЛИСТАЙТЕ ДАЛЬШЕ' },
    tech: { label: '01 — ИНСТРУМЕНТЫ', titleA: 'Технологии, которыми', titleB: 'я владею.', description: 'Инструменты, с помощью которых я воплощаю идеи в жизнь.' },
    about: { label: '02 — НЕМНОГО ОБО МНЕ', titleA: 'Любознательность.', titleB: 'Подход создателя.', lead: 'Я frontend-разработчик и люблю превращать идеи в понятные и полезные цифровые решения.', description: 'Я уделяю внимание интерфейсам, адаптивной вёрстке и надёжным интеграциям. Постоянно учусь, пробую новые инструменты и совершенствую свой подход к веб-разработке.', explore: 'Посмотреть проекты', highlights: [['Frontend-разработка', 'Создаю адаптивные интерфейсы на современных веб-технологиях.'], ['Полный цикл', 'Соединяю удобный интерфейс с API и системами управления контентом.'], ['Адаптивность', 'Делаю сайты удобными на телефонах, планшетах и компьютерах.']] },
    projects: { label: '03 — ИЗБРАННЫЕ РАБОТЫ', titleA: 'Что я', titleB: 'создал.', description: 'Проекты на стыке дизайна и разработки.', count: 'ПРОЕКТОВ', filters: 'Фильтр проектов по технологии', previous: 'Предыдущие проекты', next: 'Следующие проекты', view: 'ОТКРЫТЬ ПРОЕКТ', details: 'Подробнее', source: 'Исходный код', overview: 'О ПРОЕКТЕ', more: 'Подробности об этом проекте скоро появятся.', live: 'Открыть сайт', unavailable: 'Проекты временно недоступны', retry: 'Пожалуйста, загляните позже.', empty: 'В этой категории пока нет проектов', filterHint: 'Попробуйте выбрать другую технологию.', close: 'Закрыть описание проекта', all: 'Все' },
    contact: { label: '04 — КОНТАКТЫ', titleA: 'Есть идея для', titleB: 'проекта?', description: 'Есть идея, вопрос или просто хотите поздороваться? Я на связи.', note: 'Давайте создадим что-то важное.', turn: 'Давайте воплотим вашу', idea: 'идею в жизнь.', email: 'Написать на почту', resume: 'Скачать резюме', formTitle: 'Отправить сообщение', name: 'Ваше имя', emailLabel: 'Электронная почта', message: 'Ваше сообщение', namePlaceholder: 'Иван Иванов', emailPlaceholder: 'name@example.com', messagePlaceholder: 'Расскажите немного о вашем проекте…', send: 'Отправить', sending: 'Отправка…', sent: 'Сообщение отправлено. Спасибо!', failed: 'Не удалось отправить сообщение. Попробуйте позже.' },
    footer: { made: 'Создано с вниманием к деталям.', top: 'Наверх' },
  },
  uz: {
    nav: { home: 'Bosh sahifa', tech: 'Ko‘nikmalar', about: 'Men haqimda', projects: 'Loyihalar', contact: 'Aloqa', talk: 'Bog‘lanish', menu: 'Menyuni ochish', top: 'Yuqoriga', language: 'Tilni tanlash', light: 'Yorug‘ mavzuni yoqish', dark: 'Qorong‘i mavzuni yoqish' },
    hero: { available: 'YANGI LOYIHALAR UCHUN OCHIQMAN', kicker: 'SALOM, MEN ISMOIL IBROGIMOVMAN', leadA: 'Men raqamli', leadB: 'tajribalarni', leadC: 'yarataman, ular', leadD: 'ahamiyatli', description: 'Zamonaviy texnologiyalar yordamida toza, moslashuvchan va qulay veb-interfeyslar yaratadigan frontend dasturchiman. G‘oyalarni puxta o‘ylangan raqamli mahsulotlarga aylantiraman.', explore: 'Loyihalarim', getInTouch: 'Bog‘lanish', scroll: 'DAVOM ETING' },
    tech: { label: '01 — TEXNOLOGIYALAR', titleA: 'Ish jarayonidagi', titleB: 'vositalar.', description: 'G‘oyalarni ro‘yobga chiqarishda foydalanadigan texnologiyalar.' },
    about: { label: '02 — MEN HAQIMDA', titleA: 'Qiziquvchan fikr.', titleB: 'Yaratuvchi yondashuv.', lead: 'Men g‘oyalarni sodda va foydali raqamli tajribalarga aylantirishni yoqtiradigan frontend dasturchiman.', description: 'Puxta interfeyslar, moslashuvchan sahifalar va ishonchli integratsiyalarga e’tibor beraman. Doim o‘rganaman, yangi vositalarni sinab ko‘raman va veb uchun yechimlarimni yaxshilayman.', explore: 'Loyihalarni ko‘rish', highlights: [['Frontend dasturlash', 'Zamonaviy veb-texnologiyalarda moslashuvchan interfeyslar yarataman.'], ['To‘liq yondashuv', 'Foydalanuvchi tajribasini API va kontent boshqaruvi bilan bog‘layman.'], ['Barcha qurilmalarga mos', 'Saytlarni telefon, planshet va kompyuterlarda qulay qilaman.']] },
    projects: { label: '03 — TANLANGAN ISHLAR', titleA: 'Men yaratgan', titleB: 'loyihalar.', description: 'Dizayn va dasturlash uyg‘unlashgan ishlar.', count: 'TA LOYIHA', filters: 'Loyihalarni texnologiya bo‘yicha filtrlash', previous: 'Oldingi loyihalar', next: 'Keyingi loyihalar', view: 'LOYIHANI KO‘RISH', details: 'Batafsil', source: 'Manba kodi', overview: 'LOYIHA HAQIDA', more: 'Loyiha tafsilotlari tez orada qo‘shiladi.', live: 'Saytni ochish', unavailable: 'Loyihalar hozircha mavjud emas', retry: 'Iltimos, keyinroq qayta tekshiring.', empty: 'Bu turkumda loyihalar yo‘q', filterHint: 'Boshqa texnologiyani tanlab ko‘ring.', close: 'Loyiha tafsilotlarini yopish', all: 'Barchasi' },
    contact: { label: '04 — ALOQA', titleA: 'Loyiha g‘oyangiz', titleB: 'bormi?', description: 'G‘oya yoki savolingiz bormi, yoki shunchaki salom demoqchimisiz? Yozing.', note: 'Keling, mazmunli narsa yaratamiz.', turn: 'Keling, sizning', idea: 'g‘oyangizni ro‘yobga chiqaramiz.', email: 'Email yozish', resume: 'Rezyumeni yuklab olish', formTitle: 'Xabar yuborish', name: 'Ismingiz', emailLabel: 'Email manzili', message: 'Xabaringiz', namePlaceholder: 'Ism Familiya', emailPlaceholder: 'name@example.com', messagePlaceholder: 'Loyihangiz haqida qisqacha yozing…', send: 'Xabar yuborish', sending: 'Yuborilmoqda…', sent: 'Xabar yuborildi. Rahmat!', failed: 'Xabar yuborilmadi. Keyinroq urinib ko‘ring.' },
    footer: { made: 'E’tibor bilan ishlab chiqildi.', top: 'Yuqoriga' },
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-language');
      return ['en', 'ru', 'uz'].includes(saved) ? saved : 'en';
    } catch { return 'en'; }
  });
  const setLanguage = (next) => {
    if (!['en', 'ru', 'uz'].includes(next)) return;
    setLanguageState(next);
    try { localStorage.setItem('portfolio-language', next); } catch { /* Storage may be disabled. */ }
  };
  const value = useMemo(() => ({ language, setLanguage, t: translations[language] || translations.en }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext) || { language: 'en', setLanguage: () => {}, t: translations.en };
}

export function localizedText(value, language) {
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object') return '';
  const keys = { en: ['eng', 'en', 'english'], ru: ['rus', 'ru', 'russian'], uz: ['uz', 'uzbek'] };
  const candidates = [...(keys[language] || keys.en), ...keys.en, ...keys.ru, ...keys.uz];
  for (const key of candidates) if (typeof value[key] === 'string' && value[key].trim()) return value[key];
  return '';
}
