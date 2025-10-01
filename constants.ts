import { type Product, type TeamMember, type NavLink } from './types';

export const CATEGORIES = ['Mobiles & Tablets', 'Laptops', 'Fashion', 'Home Appliances', 'Electronics & Accessories'];

export const PRODUCTS: Product[] = [
  // Mobiles & Tablets
  {
    id: 1, name: 'iPhone 15 Pro', description: 'The ultimate iPhone, with a strong and light aerospace-grade titanium design and a powerful A17 Pro chip.', price: 144999, discount: 10, imageUrl: 'https://picsum.photos/seed/iphone15pro/400/400', rating: 4.9, reviewsCount: 410, brand: 'Apple', category: 'Mobiles & Tablets'
  },
  {
    id: 2, name: 'Samsung Galaxy S23 Ultra', description: 'Experience the epic standard in mobile innovation with the most powerful S Pen, Nightography camera, and gaming performance.', price: 129999, imageUrl: 'https://picsum.photos/seed/s23ultra/400/400', rating: 4.8, reviewsCount: 350, brand: 'Samsung', category: 'Mobiles & Tablets'
  },
  {
    id: 3, name: 'OnePlus 11 5G', description: 'The Shape of Power. A stunningly powerful flagship device that combines cutting-edge tech with sleek design.', price: 61999, discount: 15, imageUrl: 'https://picsum.photos/seed/oneplus11/400/400', rating: 4.7, reviewsCount: 290, brand: 'OnePlus', category: 'Mobiles & Tablets'
  },
  {
    id: 4, name: 'iPad Air (5th Gen)', description: 'Serious performance in a thin and light design. Powered by the Apple M1 chip, with a 10.9-inch Liquid Retina display.', price: 59999, imageUrl: 'https://picsum.photos/seed/ipadair5/400/400', rating: 4.8, reviewsCount: 215, brand: 'Apple', category: 'Mobiles & Tablets'
  },
  { id: 21, name: 'Google Pixel 8', description: 'The power of Google AI, in your hand. A super helpful phone with an amazing camera.', price: 74999, imageUrl: 'https://picsum.photos/seed/pixel8/400/400', rating: 4.8, reviewsCount: 310, brand: 'Google', category: 'Mobiles & Tablets' },
  { id: 22, name: 'Xiaomi Pad 6', description: 'A sleek and powerful tablet for work and play, featuring a 144Hz display.', price: 32999, discount: 5, imageUrl: 'https://picsum.photos/seed/xiamipad6/400/400', rating: 4.6, reviewsCount: 180, brand: 'Xiaomi', category: 'Mobiles & Tablets' },
  { id: 23, name: 'Samsung Galaxy Tab S9', description: 'Discover a more powerful tablet experience with a stunning Dynamic AMOLED 2X screen.', price: 82999, imageUrl: 'https://picsum.photos/seed/tabs9/400/400', rating: 4.9, reviewsCount: 150, brand: 'Samsung', category: 'Mobiles & Tablets' },
  { id: 24, name: 'Realme 12 Pro+', description: 'Next-gen imaging with a periscope portrait camera. A masterpiece in mobile photography.', price: 36999, imageUrl: 'https://picsum.photos/seed/realme12pro/400/400', rating: 4.5, reviewsCount: 250, brand: 'Realme', category: 'Mobiles & Tablets' },
  
  // Laptops
  {
    id: 5, name: 'MacBook Air M2', description: 'Strikingly thin and fast, the MacBook Air with M2 chip features a stunning Liquid Retina display and all-day battery life.', price: 112999, discount: 10, imageUrl: 'https://picsum.photos/seed/macbookm2/400/400', rating: 4.9, reviewsCount: 280, brand: 'Apple', category: 'Laptops'
  },
  {
    id: 6, name: 'Dell XPS 13', description: 'A 13-inch laptop designed with precision-engineered details, from stunning materials to minimal footprint.', price: 103999, imageUrl: 'https://picsum.photos/seed/dellxps13/400/400', rating: 4.7, reviewsCount: 220, brand: 'Dell', category: 'Laptops'
  },
  {
    id: 7, name: 'HP Pavilion Gaming', description: 'Sacrifice nothing with the thin and powerful HP Pavilion Gaming Laptop. Experience high-grade graphics and processing power.', price: 74999, discount: 20, imageUrl: 'https://picsum.photos/seed/hppavilion/400/400', rating: 4.5, reviewsCount: 310, brand: 'HP', category: 'Laptops'
  },
  {
    id: 8, name: 'Asus ROG Zephyrus G14', description: 'Dynamic and ready to travel, the ROG Zephyrus G14 is the world’s most powerful 14-inch gaming laptop.', price: 134999, imageUrl: 'https://picsum.photos/seed/zephyrusg14/400/400', rating: 4.8, reviewsCount: 190, brand: 'Asus', category: 'Laptops'
  },
  { id: 25, name: 'Lenovo Legion 5', description: 'Stylish on the outside. Savage on the inside. A gaming laptop that delivers pure power.', price: 107999, imageUrl: 'https://picsum.photos/seed/legion5/400/400', rating: 4.7, reviewsCount: 260, brand: 'Lenovo', category: 'Laptops' },
  { id: 26, name: 'Microsoft Surface Laptop 5', description: 'Blazing-fast performance and sleek portability in a stunning touchscreen laptop.', price: 124999, discount: 10, imageUrl: 'https://picsum.photos/seed/surface5/400/400', rating: 4.6, reviewsCount: 170, brand: 'Microsoft', category: 'Laptops' },
  { id: 27, name: 'Razer Blade 15', description: 'The ultimate gaming laptop with a powerful NVIDIA GeForce RTX graphics and a fast display.', price: 182999, imageUrl: 'https://picsum.photos/seed/razerblade15/400/400', rating: 4.8, reviewsCount: 210, brand: 'Razer', category: 'Laptops' },
  { id: 28, name: 'Acer Swift Go', description: 'An ultra-thin and light laptop with a brilliant OLED display and Intel Core Ultra processor.', price: 82999, imageUrl: 'https://picsum.photos/seed/acerswift/400/400', rating: 4.5, reviewsCount: 190, brand: 'Acer', category: 'Laptops' },
  
  // Fashion
  {
    id: 9, name: 'Nike Air Jordan 1', description: 'A timeless classic. This iconic sneaker combines premium materials with a legendary design for all-day comfort and style.', price: 15499, discount: 5, imageUrl: 'https://picsum.photos/seed/jordan1/400/400', rating: 4.9, reviewsCount: 550, brand: 'Nike', category: 'Fashion'
  },
  {
    id: 10, name: 'Levi’s Slim Fit Jeans', description: 'The definitive slim jeans. A slim fit that’s not too tight, made with high-quality denim for a perfect fit and feel.', price: 3499, imageUrl: 'https://picsum.photos/seed/levisjeans/400/400', rating: 4.6, reviewsCount: 480, brand: 'Levi\'s', category: 'Fashion'
  },
  {
    id: 11, name: 'Adidas Hoodie', description: 'A comfortable and stylish hoodie perfect for everyday wear. Made from soft fleece for a cozy feel.', price: 4499, imageUrl: 'https://picsum.photos/seed/adidashoodie/400/400', rating: 4.7, reviewsCount: 320, brand: 'Adidas', category: 'Fashion'
  },
  {
    id: 12, name: 'Titan Smart Watch', description: 'Track your fitness and stay connected in style with this feature-packed smartwatch from Titan.', price: 8999, discount: 15, imageUrl: 'https://picsum.photos/seed/titansmart/400/400', rating: 4.4, reviewsCount: 200, brand: 'Titan', category: 'Fashion'
  },
  { id: 29, name: 'Puma Suede Classic', description: 'An iconic sneaker that has been a streetwear staple for decades. Timeless style and comfort.', price: 6499, imageUrl: 'https://picsum.photos/seed/pumasuede/400/400', rating: 4.7, reviewsCount: 410, brand: 'Puma', category: 'Fashion' },
  { id: 30, name: 'Zara Leather Jacket', description: 'A premium quality faux leather jacket that adds a stylish edge to any outfit.', price: 10999, discount: 20, imageUrl: 'https://picsum.photos/seed/zarajacket/400/400', rating: 4.5, reviewsCount: 150, brand: 'Zara', category: 'Fashion' },
  { id: 31, name: 'Ray-Ban Aviator Sunglasses', description: 'Originally designed for U.S. aviators in 1937, this timeless design offers iconic style.', price: 13999, imageUrl: 'https://picsum.photos/seed/raybanaviator/400/400', rating: 4.9, reviewsCount: 620, brand: 'Ray-Ban', category: 'Fashion' },
  { id: 32, name: 'Casio G-Shock Watch', description: 'The ultimate tough watch. Known for its shock resistance, durability, and bold design.', price: 9999, imageUrl: 'https://picsum.photos/seed/gshock/400/400', rating: 4.8, reviewsCount: 580, brand: 'Casio', category: 'Fashion' },

  // Home Appliances
  {
    id: 13, name: 'LG 7kg Washing Machine', description: 'A fully automatic front load washing machine with 6 Motion Direct Drive technology for an optimal wash.', price: 25999, imageUrl: 'https://picsum.photos/seed/lgwashing/400/400', rating: 4.7, reviewsCount: 180, brand: 'LG', category: 'Home Appliances'
  },
  {
    id: 14, name: 'Samsung 324L Refrigerator', description: 'A double door refrigerator with frost-free technology and a digital inverter compressor for greater energy efficiency.', price: 39999, discount: 10, imageUrl: 'https://picsum.photos/seed/samsungfridge/400/400', rating: 4.6, reviewsCount: 210, brand: 'Samsung', category: 'Home Appliances'
  },
  {
    id: 15, name: 'Philips Air Fryer', description: 'Enjoy healthy food that\'s crispy on the outside and tender on the inside, thanks to Rapid Air Technology.', price: 8999, imageUrl: 'https://picsum.photos/seed/philipsfryer/400/400', rating: 4.8, reviewsCount: 300, brand: 'Philips', category: 'Home Appliances'
  },
  {
    id: 16, name: 'Prestige Mixer Grinder', description: 'A powerful 750W mixer grinder with 3 stainless steel jars to take care of all your grinding needs.', price: 5499, imageUrl: 'https://picsum.photos/seed/prestigemixer/400/400', rating: 4.5, reviewsCount: 250, brand: 'Prestige', category: 'Home Appliances'
  },
  { id: 33, name: 'Dyson V11 Vacuum Cleaner', description: 'Intelligently optimizes suction and run time. Deep cleans anywhere.', price: 57999, discount: 15, imageUrl: 'https://picsum.photos/seed/dysonv11/400/400', rating: 4.9, reviewsCount: 400, brand: 'Dyson', category: 'Home Appliances' },
  { id: 34, name: 'Nespresso Vertuo Coffee Machine', description: 'Experience coffee shop quality at home with the touch of a button.', price: 17999, imageUrl: 'https://picsum.photos/seed/nespresso/400/400', rating: 4.8, reviewsCount: 350, brand: 'Nespresso', category: 'Home Appliances' },
  { id: 35, name: 'Bosch Dishwasher', description: 'A quiet and efficient dishwasher that delivers sparkling clean results every time.', price: 69999, imageUrl: 'https://picsum.photos/seed/boschdw/400/400', rating: 4.7, reviewsCount: 160, brand: 'Bosch', category: 'Home Appliances' },
  { id: 36, name: 'Bajaj Air Cooler', description: 'Beat the heat with this powerful and energy-efficient air cooler for your home.', price: 10499, imageUrl: 'https://picsum.photos/seed/bajajcooler/400/400', rating: 4.3, reviewsCount: 220, brand: 'Bajaj', category: 'Home Appliances' },

  // Electronics & Accessories
  {
    id: 17, name: 'Sony WH-1000XM5 Headphones', description: 'Our best ever noise cancelling just got better. See how these Sony headphones rewrite the rules for distraction-free listening.', price: 31499, discount: 10, imageUrl: 'https://picsum.photos/seed/sonyxm5/400/400', rating: 4.9, reviewsCount: 600, brand: 'Sony', category: 'Electronics & Accessories'
  },
  {
    id: 18, name: 'Apple AirPods Pro (2nd Gen)', description: 'Rebuilt from the sound up. AirPods Pro feature up to 2x more Active Noise Cancellation, and Adaptive Transparency.', price: 27999, imageUrl: 'https://picsum.photos/seed/airpodspro2/400/400', rating: 4.8, reviewsCount: 450, brand: 'Apple', category: 'Electronics & Accessories'
  },
  {
    id: 19, name: 'Logitech MX Master 3S Mouse', description: 'An iconic mouse remastered for ultimate tactility, performance, and flow. With Quiet Clicks and an 8K DPI sensor.', price: 9999, imageUrl: 'https://picsum.photos/seed/mxmaster3s/400/400', rating: 4.9, reviewsCount: 380, brand: 'Logitech', category: 'Electronics & Accessories'
  },
  {
    id: 20, name: 'Boat Airdopes 441', description: 'Experience true wireless freedom with these stylish and powerful earbuds, featuring IWP Technology and IPX7 water resistance.', price: 2299, discount: 25, imageUrl: 'https://picsum.photos/seed/boat441/400/400', rating: 4.3, reviewsCount: 750, brand: 'Boat', category: 'Electronics & Accessories'
  },
  { id: 37, name: 'JBL Flip 6 Speaker', description: 'A portable waterproof speaker that delivers powerful sound and deep bass.', price: 10999, imageUrl: 'https://picsum.photos/seed/jblflip6/400/400', rating: 4.8, reviewsCount: 850, brand: 'JBL', category: 'Electronics & Accessories' },
  { id: 38, name: 'Anker PowerCore Power Bank', description: 'A compact and high-capacity portable charger to keep your devices powered on the go.', price: 3999, discount: 10, imageUrl: 'https://picsum.photos/seed/ankerpower/400/400', rating: 4.9, reviewsCount: 1200, brand: 'Anker', category: 'Electronics & Accessories' },
  { id: 39, name: 'Samsung T7 Portable SSD', description: 'Light-speed transfers in a compact and durable design. The perfect external storage solution.', price: 8999, imageUrl: 'https://picsum.photos/seed/samsungt7/400/400', rating: 4.9, reviewsCount: 550, brand: 'Samsung', category: 'Electronics & Accessories' },
  { id: 40, name: 'GoPro HERO12 Black', description: 'The most versatile camera in the world, with incredible image quality and HyperSmooth video stabilization.', price: 36999, imageUrl: 'https://picsum.photos/seed/gopro12/400/400', rating: 4.7, reviewsCount: 320, brand: 'GoPro', category: 'Electronics & Accessories' }
];

export const TEAM_MEMBERS: TeamMember[] = [
    {
        id: 1,
        name: 'Alex Chen',
        role: 'Founder & CEO',
        imageUrl: 'https://picsum.photos/seed/alexchen/300/300',
    },
    {
        id: 2,
        name: 'Jasmine Reed',
        role: 'Lead Designer',
        imageUrl: 'https://picsum.photos/seed/jasminereed/300/300',
    },
    {
        id: 3,
        name: 'Leo Maxwell',
        role: 'Head of Engineering',
        imageUrl: 'https://picsum.photos/seed/leomaxwell/300/300',
    },
];

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'My Account', path: '/login' },
];