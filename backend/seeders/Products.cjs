module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Products', [
        {
            id: 1,
            title: '100% Whey Gold Standard, 5 lbs.',
            description: 'Чистый сывороточный белок с минимальным содержанием жиров и углеводов. Идеален для набора мышечной массы.',
            count: 15,
            photo: "https://5lb.ru/upload/iblock/1d2/04bdvsupaml7dmdqchfahjsdgad7o8p6.png",
            price: 2990,
            vendorInfo: 'Optimum Nutrition'
        },
        {
            id: 2,
            title: 'Creatine Monohydrate, 300 g',
            description: 'Чистый креатин моногидрат для увеличения силы и выносливости. Повышает эффективность тренировок.',
            count: 8,
            photo: "https://5lb.ru/upload/iblock/8e9/p92m0681h2tybkfuj2ocul5n2ouekhmn.png",
            price: 1490,
            vendorInfo: '5LB'
        },
        {
            id: 3,
            title: 'BCAA 2:1:1, 400 g',
            description: 'Сбалансированный комплекс аминокислот для восстановления мышц и предотвращения катаболизма.',
            count: 10,
            photo: "https://viking-style.ru/wa-data/public/shop/products/21/11/11121/images/10261/10261.970.png",
            price: 2190,
            vendorInfo: 'GeneticLab'
        },
        {
            id: 4,
            title: 'L-Carnitine 3000, 60 мл',
            description: 'Жидкий L-карнитин для усиления жиросжигания и повышения энергии во время тренировок.',
            count: 20,
            photo: "https://spb-sportivnoe-pitanie.ru/image/cache/catalog/2SN/k-rijn-1000x1000.png",
            price: 990,
            vendorInfo: 'Maxler'
        },
        {
            id: 5,
            title: 'Mass Gainer 3000, 3 кг',
            description: 'Высококалорийный гейнер для быстрого набора массы. Содержит комплекс углеводов и белков.',
            count: 7,
            photo: "https://kingmass.ru/upload/iblock/ed6/ed6b476556cb61fbdaf9a276eec4bf7d.jpg",
            price: 3490,
            vendorInfo: 'BSN'
        },
        {
            id: 6,
            title: 'Pre-Workout Explosion, 200 g',
            description: 'Мощный предтренировочный комплекс для повышения энергии, фокуса и выносливости.',
            count: 12,
            photo: "https://proteinhouse.mu/cdn/shop/files/sixstar-pre-workout-explosion-20-883900.png?v=1718701904",
            price: 2590,
            vendorInfo: 'MuscleTech'
        },
        {
            id: 7,
            title: 'ZMA Complex, 90 капс',
            description: 'Комплекс цинка, магния и витамина B6 для улучшения восстановления и качества сна.',
            count: 18,
            photo: "https://geonlab.ru/upload/iblock/16a/qmr4c1dm1vuh9bzslb75qip32c68n80i.png",
            price: 1790,
            vendorInfo: 'NOW Foods'
        },
        {
            id: 8,
            title: 'Omega-3 Fish Oil, 120 капс',
            description: 'Высококачественный рыбий жир с повышенным содержанием Омега-3 кислот.',
            count: 25,
            photo: "https://images.apteka.ru/original_f2583d0e-3def-4d85-8ced-db2cbc6603be.jpeg",
            price: 1290,
            vendorInfo: 'Universal Nutrition'
        },
        {
            id: 9,
            title: 'Vitamin D3 5000 IU, 120 капс',
            description: 'Высокодозированный витамин D3 для поддержки иммунитета и костной системы.',
            count: 14,
            photo: "https://ir.ozone.ru/s3/multimedia-8/c1000/6400951700.jpg",
            price: 890,
            vendorInfo: 'Sports Research'
        },
        {
            id: 10,
            title: 'Glutamine Powder, 300 g',
            description: 'Чистый L-глютамин для восстановления мышц и поддержки иммунной системы.',
            count: 9,
            photo: "https://avatars.mds.yandex.net/get-mpic/1614201/2a0000018b022f7f205712d9eef198811da0/orig",
            price: 1990,
            vendorInfo: 'MyProtein'
        },
        {
            id: 11,
            title: 'Hydrowhey, 2 кг',
            description: 'Гидролизованный сывороточный белок для максимально быстрого усвоения.',
            count: 6,
            photo: "https://sportivnoepitanie.ru/img/item/500/optimum-nutrition-platinum-hydrowhey-1590g-1.jpg",
            price: 5990,
            vendorInfo: 'Optimum Nutrition'
        },
        {
            id: 12,
            title: 'Casein Pro, 2 кг',
            description: 'Медленный белок казеин для длительного питания мышц, особенно перед сном.',
            count: 11,
            photo: "https://geneticlab.ru/upload/iblock/63a/bouu9t2l6tgc36ew4m4rz8bxj4jw8cbu.jpg",
            price: 4590,
            vendorInfo: 'MusclePharm'
        },
        {
            id: 13,
            title: 'EAA Pro, 300 г',
            description: 'Комплекс незаменимых аминокислот в оптимальном соотношении.',
            count: 13,
            photo: "https://bsnoren.ru/upload/iblock/2fb/soxul3zrr0k469em0jcf5395a2wlic8p.jpg",
            price: 2790,
            vendorInfo: 'Scitec Nutrition'
        },
        {
            id: 14,
            title: 'L Карнитин 800 мг carnitine',
            description: 'Повышает физическую выносливость и сокращает период восстановления у спортсменов. Улучшает насыщение клеток кислородом.',
            count: 8,
            photo: "https://ir.ozone.ru/s3/multimedia-1-u/wc1000/7065969726.jpg",
            price: 522,
            vendorInfo: 'GLS Pharmaceuticals'
        },
        {
            id: 15,
            title: 'Collagen Peptides, 300 г',
            description: 'Гидролизованный коллаген для здоровья суставов, кожи и соединительной ткани.',
            count: 16,
            photo: "https://avatars.mds.yandex.net/get-mpic/7716311/img_id6395378223973104393.jpeg/orig",
            price: 2490,
            vendorInfo: 'Vital Proteins'
        }
      ], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Products', null, {});
    }
  };