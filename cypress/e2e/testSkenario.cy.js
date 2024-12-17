describe('Navigasi berfungsi dengan baik', () => {
  it('Navigasi header ditampilkan dengan benar', () => {
    cy.viewport(1280, 720);
    cy.visit('https://greenlify.systems/');
    cy.get('.h-11').should('exist').and('be.visible');
    cy.get('.flex > :nth-child(1) > .group').should('have.text', 'Beranda');
    cy.get(':nth-child(2) > .group').should('have.text', 'Statistik');
    cy.get(':nth-child(3) > .group').should('have.text', 'Prediksi');
    cy.get(':nth-child(4) > .group').should('have.text', 'Produk');
    cy.get(':nth-child(5) > .group').should('have.text', 'Blog');
    cy.get(':nth-child(6) > .group').should('have.text', 'Partisipasi');
    cy.get('.flex > :nth-child(7) > .group').should('have.text', 'Tentang Kami');
    cy.get('.hidden > .bg-emerald-500').should('have.text', 'Klasifikasi');
    cy.get('.hidden > div > .inline-flex').should('have.text', 'Login');
  })
  it('Navigasi header berfungsi dengan baik', () => {
    cy.viewport(1280, 720);
    cy.visit('https://greenlify.systems/');
    cy.get('.h-11').should('exist').and('be.visible');
    cy.get('.flex > :nth-child(1) > .group').click();
    cy.url().should('eq', 'https://greenlify.systems/');
    cy.get('.flex > :nth-child(2) > .group').click();
    cy.url().should('eq', 'https://greenlify.systems/statistik');
    cy.get('.flex > :nth-child(3) > .group').click();
    cy.url().should('eq', 'https://greenlify.systems/prediksi');
    cy.get('.flex > :nth-child(4) > .group').click();
    cy.url().should('eq', 'https://greenlify.systems/produk');
    cy.get('.flex > :nth-child(5) > .group').click();
    cy.url().should('eq', 'https://greenlify.systems/blog');
    cy.get('.flex > :nth-child(6) > .group').click();
    cy.url().should('eq', 'https://greenlify.systems/anggotakami');
    cy.get('.flex > :nth-child(7) > .group').click();
    cy.url().should('eq', 'https://greenlify.systems/tentangkami');
    cy.get('.hidden > .bg-emerald-500').click();
    cy.url().should('eq', 'https://greenlify.systems/prediksi');
    cy.get('.hidden > div > .inline-flex').click();
    cy.url().should('eq', 'https://greenlify.systems/login');
  })
  it('Navigasi footer ditampilkan dengan benar', () => {
    cy.viewport(1280, 720);
    cy.visit('https://greenlify.systems/');
    cy.get('.h-16').should('exist').and('be.visible');
  })
})

describe('Halaman beranda', () => {
  it('Halaman beranda ditampilkan dengan benar', () => {
    cy.viewport(1280, 720);
    cy.visit('https://greenlify.systems/');
    cy.get('.h-11').should('exist').and('be.visible');
    cy.get('.max-w-3xl > .font-bold').should('have.text', 'Transformasi Sampah, Ciptakan Manfaat');
    cy.get('.max-w-md > .text-slate-700').should('have.text', 'Sistem Cerdas AI untuk Mengklasifikasi Sampah Organik dan Anorganik Secara Otomatis').and('be.visible');
    cy.get('.mt-4 > .inline-flex').should('have.text', 'Lihat lebih banyak').and('be.visible');
    cy.get('.lazy-load-image-background > .hidden').should('exist').and('be.visible');
    cy.get('.max-w-3xl > .italic').should('have.text', '“ Platform kami dirancang untuk membantu masyarakat memahami berbagai jenis sampah dan memberikan rekomendasi pengelolaan yang tepat menggunakan implementasi dari machine learning. Dengan begitu, sampah dapat dikelola secara efektif, memberi manfaat, dan mendukung keberlanjutan lingkungan “');
    cy.get('.max-w-4xl > .text-slate-700').should('have.text', 'Dengan fitur unggah gambar, pengguna bisa dengan mudah mengirimkan foto sampah untuk diklasifikasikan. Prosesnya cepat, mudah, dan intuitif, sehingga siapa saja dapat melakukannya tanpa kesulitan.');
  })
});

