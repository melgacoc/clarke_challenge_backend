'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const suppliers = [
      {
        name: 'Engie Brasil Energia',
        logo: 'https://example.com/logo-engie.png',
        state_origin: 'SP',
        cost_per_kWh: 0.1234,
        min_kWh_limit: 100,
        total_clients: 200,
        avg_rating: 4.5,
        email: 'engie@engie.com',
        password: hashedPassword,
      },
      {
        name: 'Eletrobras',
        logo: 'https://example.com/logo-eletrobras.png',
        state_origin: 'RJ',
        cost_per_kWh: 0.1456,
        min_kWh_limit: 150,
        total_clients: 300,
        avg_rating: 4.0,
        email: 'eletrobras@eletrobras.com',
        password: hashedPassword,
      },
      {
        name: 'Neoenergia',
        logo: 'https://example.com/logo-neoenergia.png',
        state_origin: 'BA',
        cost_per_kWh: 0.1123,
        min_kWh_limit: 120,
        total_clients: 220,
        avg_rating: 3.9,
        email: 'neoenergia@neoenergia.com',
        password: hashedPassword,
      },
      {
        name: 'CPFL Energia',
        logo: 'https://example.com/logo-cpfl.png',
        state_origin: 'SP',
        cost_per_kWh: 0.1345,
        min_kWh_limit: 130,
        total_clients: 250,
        avg_rating: 4.7,
        email: 'cpfl@cpfl.com',
        password: hashedPassword,
      },
      {
        name: 'Light S.A.',
        logo: 'https://example.com/logo-light.png',
        state_origin: 'RJ',
        cost_per_kWh: 0.1256,
        min_kWh_limit: 140,
        total_clients: 280,
        avg_rating: 4.2,
        email: 'light@light.com',
        password: hashedPassword,
      },
      {
        name: 'Cemig',
        logo: 'https://example.com/logo-cemig.png',
        state_origin: 'MG',
        cost_per_kWh: 0.1156,
        min_kWh_limit: 110,
        total_clients: 210,
        avg_rating: 4.1,
        email: 'cemig@cemig.com',
        password: hashedPassword,
      },
      {
        name: 'Coelba',
        logo: 'https://example.com/logo-coelba.png',
        state_origin: 'BA',
        cost_per_kWh: 0.1233,
        min_kWh_limit: 160,
        total_clients: 320,
        avg_rating: 4.3,
        email: 'coelba@coelba.com',
        password: hashedPassword,
      },
      {
        name: 'RGE S.A.',
        logo: 'https://example.com/logo-rge.png',
        state_origin: 'RS',
        cost_per_kWh: 0.1356,
        min_kWh_limit: 180,
        total_clients: 340,
        avg_rating: 3.8,
        email: 'rge@rge.com',
        password: hashedPassword,
      },
      {
        name: 'Energisa',
        logo: 'https://example.com/logo-energisa.png',
        state_origin: 'PB',
        cost_per_kWh: 0.1450,
        min_kWh_limit: 150,
        total_clients: 300,
        avg_rating: 4.6,
        email: 'energisa@energisa.com',
        password: hashedPassword,
      },
      {
        name: 'Equatorial Energia',
        logo: 'https://example.com/logo-equatorial.png',
        state_origin: 'MA',
        cost_per_kWh: 0.1556,
        min_kWh_limit: 170,
        total_clients: 310,
        avg_rating: 4.0,
        email: 'equatorial@equatorial.com',
        password: hashedPassword,
      },
      {
        name: 'Furnas Centrais Elétricas',
        logo: 'https://example.com/logo-furnas.png',
        state_origin: 'RJ',
        cost_per_kWh: 0.1400,
        min_kWh_limit: 200,
        total_clients: 400,
        avg_rating: 3.7,
        email: 'furnas@furnas.com',
        password: hashedPassword,
      },
      {
        name: 'AES Tietê',
        logo: 'https://example.com/logo-aes.png',
        state_origin: 'SP',
        cost_per_kWh: 0.1656,
        min_kWh_limit: 220,
        total_clients: 450,
        avg_rating: 4.8,
        email: 'aestiete@aes.com',
        password: hashedPassword,
      }
    ]

    for (const supplier of suppliers) {
      await queryInterface.sequelize.models.Supplier.findOrCreate({ 
        where: { email: supplier.email },
        defaults: supplier
      });
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('suppliers', null, {});
  }
};
