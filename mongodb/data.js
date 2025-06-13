//DATABASE
use food_delivery

//1. Collection food_reviews
db.createCollection("food_reviews");

db.food_reviews.insertMany([
  {
    user_id: 1,
    menu_id: 1,
    restaurant_id: 2,
    review_text: "Enak banget!",
    rating: 5,
    time: ISODate("2025-06-11T13:00:00Z")
  },
  {
    user_id: 2,
    menu_id: 2,
    restaurant_id: 1,
    review_text: "Lumayan enak, tapi agak asin.",
    rating: 3,
    time: ISODate("2025-06-10T19:45:00Z")
  },
  {
    user_id: 3,
    menu_id: 3,
    restaurant_id: 3,
    review_text: "Rasanya standar.",
    rating: 3,
    time: ISODate("2025-06-09T12:30:00Z")
  },
  {
    user_id: 4,
    menu_id: 1,
    restaurant_id: 2,
    review_text: "Menu favorit saya!",
    rating: 5,
    time: ISODate("2025-06-08T17:15:00Z")
  },
  {
    user_id: 5,
    menu_id: 4,
    restaurant_id: 4,
    review_text: "Kurang fresh bahan-bahannya.",
    rating: 2,
    time: ISODate("2025-06-07T11:10:00Z")
  }
]);

//2. Collection delivery_tracking
db.createCollection("delivery_tracking");

db.delivery_tracking.insertMany([
  {
    order_id: 101,
    driver_id: 2,
    current_status: "on the way",
    estimated_time: "10:40",
    location_note: "Dekat pintu gerbang"
  },
  {
    order_id: 102,
    driver_id: 4,
    current_status: "delivered",
    estimated_time: "18:45",
    location_note: "Ditinggal di resepsionis"
  },
  {
    order_id: 103,
    driver_id: 3,
    current_status: "preparing",
    estimated_time: "20:00",
    location_note: "Restoran sedang masak"
  },
  {
    order_id: 104,
    driver_id: 5,
    current_status: "on the way",
    estimated_time: "09:00",
    location_note: "Sebelah warung Bu Siti"
  },
  {
    order_id: 105,
    driver_id: 1,
    current_status: "on the way",
    estimated_time: "20:15",
    location_note: "Mendekati kompleks perumahan"
  }
]);

// 3. Collection preferences
db.createCollection("preferences");

db.preferences.insertMany([
  {
    user_id: 1,
    preferred_categories: ["Sushi", "Burger"],
    favorite_menu_names: ["Cheeseburger"]
  },
  {
    user_id: 2,
    preferred_categories: ["Ayam Bakar", "Salad"],
    favorite_menu_names: ["Ayam Bakar Spesial"]
  },
  {
    user_id: 3,
    preferred_categories: ["Pizza", "Pasta"],
    favorite_menu_names: ["Pepperoni Pizza", "Carbonara"]
  },
  {
    user_id: 4,
    preferred_categories: ["Dimsum", "Bakso"],
    favorite_menu_names: ["Bakso Urat Jumbo"]
  },
  {
    user_id: 5,
    preferred_categories: ["Korean Food", "Rice Bowl"],
    favorite_menu_names: ["Bibimbap", "Katsu Don"]
  }
]);

// 4. Collection search_history
db.createCollection("search_history");

db.search_history.insertMany([
  {
    user_id: 1,
    searches: [
      { keyword: "ayam goreng", timestamp: ISODate(), result_count: 12 },
      { keyword: "burger", timestamp: ISODate(), result_count: 8 }
    ]
  },
  {
    user_id: 2,
    searches: [
      { keyword: "dimsum", timestamp: ISODate("2025-06-09T17:10:00Z"), result_count: 5 }
    ]
  },
  {
    user_id: 3,
    searches: [
      { keyword: "pizza", timestamp: ISODate(), result_count: 7 },
      { keyword: "salad", timestamp: ISODate(), result_count: 4 }
    ]
  },
  {
    user_id: 4,
    searches: [
      { keyword: "mie goreng", timestamp: ISODate("2025-06-08T09:45:00Z"), result_count: 6 }
      { keyword: "katsu", timestamp: ISODate("2025-06-08T10:00:00Z"), result_count: 7 }
      
    ]
  },
  {
    user_id: 5,
    searches: [
      { keyword: "katsu", timestamp: ISODate("2025-06-06T15:30:00Z"), result_count: 9 }
    ]
  }
]);

//5. Collection promotions
db.createCollection("promotions");

db.promotions.insertMany([
  {
    promo_code: "DISKON10",
    description: "Diskon 10% semua menu",
    discount_percent: 10,
    min_order_value: 30000,
    valid_until: ISODate("2025-12-31T23:59:59Z"),
    applicable_restaurant_ids: [1, 2]
  },
  {
    promo_code: "ONGKIRGRATIS",
    description: "Gratis ongkir untuk order di atas Rp75.000",
    discount_percent: 0,
    min_order_value: 75000,
    valid_until: ISODate("2025-09-30T23:59:59Z"),
    applicable_restaurant_ids: [2, 3, 4]
  },
  {
    promo_code: "CASHBACK15",
    description: "Cashback 15% untuk pengguna baru",
    discount_percent: 15,
    min_order_value: 25000,
    valid_until: ISODate("2025-12-01T23:59:59Z"),
    applicable_restaurant_ids: [1]
  },
  {
    promo_code: "MEALDEAL20",
    description: "Diskon 20% untuk paket combo",
    discount_percent: 20,
    min_order_value: 50000,
    valid_until: ISODate("2025-10-15T23:59:59Z"),
    applicable_restaurant_ids: [3, 5]
  },
  {
    promo_code: "WEEKEND15",
    description: "Diskon 15% untuk order yang dilakukan pada hari Sabtu dan Minggu",
    discount_percent: 15,
    min_order_value: 20000,
    valid_until: ISODate("2025-11-30T23:59:59Z"),
    applicable_restaurant_ids: [1, 5],
  }
]);

// USER
// Admin user (akses penuh)
db.getSiblingDB("admin").createUser({
  user: "admin",
  pwd: "admin123",
  roles: [
    { role: "userAdminAnyDatabase", db: "admin" },
    { role: "readWriteAnyDatabase", db: "admin" }
  ]
});

// Customer user (akses CRUD terbatas ke food_delivery)
db.getSiblingDB("food_delivery").createUser({
  user: "customer",
  pwd: "customer123",
  roles: [
    { role: "readWrite", db: "food_delivery" }
  ]
});

// Driver user (hanya read akses ke food_delivery)
db.getSiblingDB("food_delivery").createUser({
  user: "driver",
  pwd: "driver123",
  roles: [
    { role: "read", db: "food_delivery" }
  ]
});
