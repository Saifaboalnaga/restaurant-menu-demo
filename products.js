// Edit this file to change the menu: add, remove or update products and prices.
// WHATSAPP_NUMBER: international format, digits only (demo number below).
const WHATSAPP_NUMBER = "201000000000";
const CURRENCY = "ج.م";

const CATEGORIES = [
  { id: "all", name: "الكل", icon: "🍽️" },
  { id: "burgers", name: "Burgers", icon: "🍔" },
  { id: "pizza", name: "Pizza", icon: "🍕" },
  { id: "drinks", name: "Drinks", icon: "🥤" },
  { id: "desserts", name: "Desserts", icon: "🍰" },
];

const PRODUCTS = [
  { id: 1, cat: "burgers", name: "كلاسيك برجر", price: 145, icon: "🍔", color: "#f6d7b0", desc: "قطعة لحم بقري 150 جم مشوية على الفحم، خس، طماطم، بصل، وصوص البيت." },
  { id: 2, cat: "burgers", name: "دبل تشيز", price: 210, icon: "🍔", color: "#f3c98b", desc: "قطعتين لحم مع شيدر مضاعف، مخلل، وصوص سموكي.", tag: "الأكثر طلبًا" },
  { id: 3, cat: "burgers", name: "تشيكن كرسبي", price: 165, icon: "🍗", color: "#f5dfa8", desc: "صدر فراخ مقرمش، كول سلو، ومايونيز بالثوم." },
  { id: 4, cat: "burgers", name: "مشروم سويس", price: 190, icon: "🍄", color: "#e8d3bf", desc: "لحم بقري مع مشروم سوتيه وجبنة سويسري." },
  { id: 5, cat: "pizza", name: "مارجريتا", price: 160, icon: "🍕", color: "#f8c9b6", desc: "صوص طماطم، موتزاريلا، وريحان طازة." },
  { id: 6, cat: "pizza", name: "بيبروني", price: 195, icon: "🍕", color: "#f4b9a2", desc: "بيبروني بقري مع موتزاريلا وأوريجانو.", tag: "جديد" },
  { id: 7, cat: "pizza", name: "فور تشيز", price: 210, icon: "🧀", color: "#f7e1a6", desc: "موتزاريلا، شيدر، رومي، وجبنة زرقا." },
  { id: 8, cat: "drinks", name: "ليمون نعناع", price: 55, icon: "🍋", color: "#d9f0b8", desc: "ليمون فريش مع نعناع وثلج." },
  { id: 9, cat: "drinks", name: "ميلك شيك شوكولاتة", price: 85, icon: "🥤", color: "#e2c6b4", desc: "آيس كريم شوكولاتة مع لبن وكريمة." },
  { id: 10, cat: "drinks", name: "كولا", price: 30, icon: "🥤", color: "#f2cfc9", desc: "كانز 330 مل ساقع." },
  { id: 11, cat: "desserts", name: "براوني", price: 75, icon: "🍫", color: "#d9c0ae", desc: "براوني سخنة مع صوص شوكولاتة." },
  { id: 12, cat: "desserts", name: "تشيز كيك", price: 90, icon: "🍰", color: "#f6d9de", desc: "تشيز كيك نيويورك بصوص الفراولة." },
];
