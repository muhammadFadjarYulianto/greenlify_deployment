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

describe('Halaman statistik', () => {
  it('Halaman statistik ditampilkan dengan benar', () => {
    cy.viewport(1280, 720);
    cy.visit('https://greenlify.systems/statistik');
    cy.contains('Statistik Sampah').should('exist').and('be.visible');
    cy.contains('Tahukah Anda bahwa setiap harinya, jutaan ton sampah dihasilkan dan sebagian besar berakhir mencemari alam? Di sini, kami menampilkan data nyata tentang dampak sampah terhadap lingkungan, dari jumlah limbah plastik yang mengotori lautan hingga tingkat daur ulang yang masih jauh dari optimal. Melalui statistik ini, kami mengajak Anda untuk lebih peduli, mengambil langkah kecil, dan bersama-sama menciptakan perubahan besar.').should('exist').and('be.visible');
    cy.get('.recharts-surface').should('exist').and('be.visible');
    cy.get('.w-full.text-center').should('exist').and('be.visible');
    cy.contains('Komposisi Sampah Berdasarkan Jenis Sampah').should('exist').and('be.visible');
    cy.get('.mt-4').should('exist').and('be.visible');
  });
});

describe('Halaman prediksi', () => {
  it('Halaman prediksi ditampilkan dengan benar', () => {
    cy.viewport(1280, 720);
    cy.visit('https://greenlify.systems/prediksi');
    cy.contains('Prediksi Sampah').should('exist').and('be.visible');
    cy.contains('Sistem canggih kami akan menganalisis gambar dan memberikan saran pengelolaan sampah yang tepat, mulai dari pemilahan hingga metode daur ulang yang ramah lingkungan. Dengan teknologi ini, mengelola sampah menjadi lebih mudah dan efisien, membantu Anda berperan aktif dalam menjaga kebersihan dan kelestarian bumi.').should('exist').and('be.visible');
    cy.get('.mb-6 > .justify-between > :nth-child(1) > .flex').should('have.text', '1');
    cy.get('.mb-6 > .justify-between > :nth-child(2) > .flex').should('have.text', '2');
    cy.get('.flex-0 > .flex').should('have.text', '3');
    cy.contains('Ayo Prediksi Sampahmu dulu!').should('exist').and('be.visible');
    cy.contains('Kategori Sampah Yang Tersedia').should('exist').and('be.visible');
    cy.contains('Kardus atau Cardboard').should('exist').and('be.visible');
    cy.contains('Kaca').should('exist').and('be.visible');
    cy.contains('Metal').should('exist').and('be.visible');
    cy.contains('Kertas').should('exist').and('be.visible');
    cy.contains('Plastik').should('exist').and('be.visible');
    cy.contains('Organik').should('exist').and('be.visible');
  });
  it('Prediksi sampah berhasil', () => {
    cy.viewport(1280, 720);
    cy.visit('https://greenlify.systems/prediksi');
    cy.contains('Unggah File Gambar').click();
    cy.get('input[type="file"]').attachFile('./images/sampah.png');
    cy.wait(5000);
    cy.get('.space-y-5 > .rounded-md', { timeout: 10000 }).should('be.visible').should('not.be.disabled').click({ force: true });
    cy.wait(5000);
    cy.contains('Hasil Prediksi').should('exist').and('be.visible');
    cy.contains('Dari file yang anda unggah, berikut adalah hasil prediksi yang sistem kami lakukan').should('exist').and('be.visible');
    cy.get('.justify-end > .inline-flex').click();
    cy.contains('Coba Selesaikan Tantangan Berikut Yuk!').should('exist').and('be.visible');
    cy.get(':nth-child(2) > .gap-8 > .flex').should('be.visible');
    cy.contains('Selanjutnya').click();
    cy.contains('Coba Dapatkan Apresiasi Berikut!').should('exist').and('be.visible');
    cy.contains('Selamat Anda Berhasil!').should('exist').and('be.visible');
    cy.contains('Apresiasi Akan Segera Hadir!').should('exist').and('be.visible');
    cy.contains('Sebelumnya').click();
    cy.contains('Sebelumnya').click();
  });
  it('Fitur Capture Photo berhasil', () => {
    cy.viewport(1280, 720);
    cy.visit('https://greenlify.systems/prediksi');
    cy.contains('Scan Menggunakan Kamera').click();
    cy.wait(5000);
    cy.contains('Capture Photo').click();
  });
});

describe('Halaman produk', () => {
  it('Halaman produk ditampilkan dengan benar', () => {
    cy.viewport(1280, 720);
    cy.visit('https://greenlify.systems/produk');
    cy.contains('Produk Ramah Lingkungan').should('exist').and('be.visible');
    cy.contains('Produk Inovatif').should('exist').and('be.visible');
    cy.contains('Produk inovatif kami dirancang untuk mendukung keberlanjutan dan menciptakan masa depan yang lebih hijau, dengan solusi ramah lingkungan yang membantu mengurangi dampak negatif terhadap bumi. Produk kami terbuat dari bahan-bahan yang ramah lingkungan dan dapat di daur ulang.').should('exist').and('be.visible');
    cy.contains('Rentang Harga').click();
    cy.contains('Di Bawah 10000').should('exist').and('be.visible');
    cy.contains('10000 - 50000').should('exist').and('be.visible');
    cy.contains('Di Atas 50000').should('exist').and('be.visible');
    cy.contains('Kategori').click({ force: true });
    cy.contains('Kain').should('exist').and('be.visible');
    cy.contains('Kayu').should('exist').and('be.visible');
    cy.contains('Kertas').should('exist').and('be.visible');
    cy.contains('Metal').should('exist').and('be.visible');
    cy.contains('Kaca').should('exist').and('be.visible');
  });
  it('Fitur search produk berfungsi dengan benar', () => {
    cy.viewport(1280, 720);
    cy.visit('https://greenlify.systems/produk');
    cy.get('.mt-4 > .flex').type('Tas' ,{force: true});
    cy.get('[href="/produk/1"] > .border-none > .overflow-hidden > .w-full').should('exist').and('be.visible');
  });
  it('Detail produk ditampilkan', () => {
    cy.viewport(1280, 720);
    cy.visit('https://greenlify.systems/produk');
    cy.get('[href="/produk/1"] > .border-none > .overflow-hidden > .w-full').click();
    cy.get('.justify-end > .inline-flex').click();
  });
});

describe('Halaman Blog', () => {
  it('Halaman Blog ditampilkan dengan benar', () => {
    cy.viewport(1280, 720);
    cy.visit('https://greenlify.systems/blog');
    cy.get('.inset-0').should('be.visible');
    cy.contains('Blog Greenlify').should('exist').and('be.visible');
    cy.contains('Blog Greenlify menyajikan informasi terkini seputar isu lingkungan, inovasi teknologi hijau, dan solusi berkelanjutan. Dengan fokus pada edukasi dan inspirasi, article ini bertujuan meningkatkan kesadaran masyarakat terhadap pentingnya menjaga bumi. Beragam artikel menarik dihadirkan untuk memotivasi pembaca mengambil langkah kecil menuju perubahan besar.').should('exist').and('be.visible');
  });
  it('Fitur Search blog berfungsi', () => {
    cy.viewport(1280, 720);
    cy.visit('https://greenlify.systems/blog');
    cy.get('input[placeholder="Cari postingan blog..."]').type('Aksi');
    cy.get(':nth-child(1) > a > .border-none > .rounded-md > .w-full').should('exist').and('be.visible');
  });
  it('Detail Blog ditampilkan', () => {
    cy.viewport(1280, 720);
    cy.visit('https://greenlify.systems/blog');
    cy.get(':nth-child(1) > a > .border-none > .rounded-md > .w-full').click();
  });
});

describe('Halaman Partisipasi', () => {
  it('Element pada halaman Partisipasi ditampilkan dengan baik', () =>{
    cy.viewport(1280, 720);
    cy.visit('https://greenlify.systems/anggotakami');
    cy.contains('Anggota Kami').should('exist').and('be.visible');
    cy.contains('Kenali komunitas inspiratif yang telah menjadi bagian penting dari gerakan pengelolaan sampah yang lebih baik. Mereka adalah wujud nyata kepedulian dan aksi kolektif dalam menciptakan lingkungan yang bersih dan lestari. Berikan apresiasi atas kontribusi mereka, dan mari bersama-sama bergabung dalam langkah nyata untuk membangun masa depan yang lebih hijau dan berkelanjutan"').should('exist').and('be.visible');
    cy.contains('No').should('exist').and('be.visible');
    cy.contains('RT/RW').should('exist').and('be.visible');
    cy.contains('Desa').should('exist').and('be.visible');
    cy.contains('Lama Bergabung').should('exist').and('be.visible');
    cy.contains('Kegiatan Komunitas').should('exist').and('be.visible');
    cy.contains('Berikut adalah beberapa kegiatan yang telah dilakukan oleh komunitas kami. Kami bersama-sama bekerja untuk mencapai tujuan dan membawa perubahan positif. Mari bergabung dan jadi bagian dari perjalanan ini!').should('exist').and('be.visible');
    cy.get('[src="/assets/1-BCuNnmxi.png"]').should('exist').and('be.visible');
    cy.get('[src="/assets/2-6JS9uewF.png"]').should('exist').and('be.visible');
    cy.get('[src="/assets/3-DJ_tfW8P.png"]').should('exist').and('be.visible');
    cy.get('[src="/assets/4-DsvGcdIN.png"]').should('exist').and('be.visible');
    cy.get('[src="/assets/5-DTe0nl5-.png"]').should('exist').and('be.visible');
    cy.get('[src="/assets/5-DTe0nl5-.png"]').should('exist').and('be.visible');
  })
});

describe('Halaman Tentang Kami', () => {
  it('Element pada halaman Tentang Kami ditampilkan dengan baik', () =>{
    cy.viewport(1280, 720);
    cy.visit('https://greenlify.systems/tentangkami');
    cy.contains('Tentang Kami').should('exist').and('be.visible');
    cy.contains('Kami adalah komunitas kecil yang sedang merintis upaya nyata dalam pengelolaan sampah. Dengan menampung sampah yang dapat didaur ulang, kami berkolaborasi dengan masyarakat untuk menemukan solusi kreatif dan berkelanjutan dalam mengatasi tantangan pengelolaan sampah, demi menciptakan lingkungan yang lebih bersih dan sehat.').should('exist').and('be.visible');
    cy.contains('Visi').should('exist').and('be.visible');
    cy.get('.lazy-load-image-background > .hidden').should('exist').and('be.visible');
    cy.contains('Menjadi platform terdepan yang mendukung pengelolaan sampah secara bijaksana dan ramah lingkungan, sekaligus mendorong masyarakat untuk mengambil langkah proaktif dalam menjaga kelestarian bumi. Platform ini bertujuan untuk meningkatkan kesadaran akan pentingnya daur ulang dan pengurangan limbah, serta menyediakan solusi inovatif yang memudahkan pengelolaan sampah secara efisien.').should('exist').and('be.visible');
    cy.contains('Misi').should('exist').and('be.visible');
    cy.contains('Meningkatkan kesadaran masyarakat tentang pentingnya pengelolaan sampah melalui informasi statistik yang akurat dan relevan. Platform ini juga menyediakan panduan praktis untuk daur ulang dan pengurangan limbah, sehingga mempermudah individu dan komunitas dalam menerapkan kebiasaan yang ramah lingkungan.').should('exist').and('be.visible');
    cy.contains('Kerja Sama').should('exist').and('be.visible');    
    cy.get('.h-auto.px-4 > .flex > :nth-child(1) > .h-16').should('exist');
    cy.get(':nth-child(2) > .h-16').should('exist');
    cy.get(':nth-child(3) > .h-16').should('exist')
    cy.get(':nth-child(4) > .h-16').should('exist')
    cy.get(':nth-child(5) > .h-16').should('exist') 
    cy.contains('Profile Tim').should('exist').and('be.visible');
    cy.contains('Kami adalah sekelompok individu yang berdedikasi untuk menciptakan solusi inovatif dalam pengelolaan sampah dan pelestarian lingkungan.').should('exist').and('be.visible');
  });
});

describe('Halaman Login', () => {
  it('Element pada halaman Login ditampilkan dengan baik', () =>{
    cy.viewport(1280, 720);
    cy.visit('https://greenlify.systems/login');
    cy.get('.hidden > .absolute').should('exist').and('be.visible');
    cy.get('.w-34').should('exist').and('be.visible');
    cy.contains('Admin Login').should('exist').and('be.visible');
    cy.contains('pengelolaan sampah dengan deteksi menggunakan teknologi AI dan promosi produk ramah lingkungan').should('exist').and('be.visible');
    cy.contains('Email').should('exist').and('be.visible');
    cy.contains('Password').should('exist').and('be.visible');
    cy.contains('Biarkan saya tetap masuk').should('exist').and('be.visible');
    cy.get('form > .inline-flex').should('exist').and('be.visible');
    cy.contains('Kesulitan, Perlu bantuan? Hubungi kami').should('exist').and('be.visible');
  });
  it('Login Gagal', () => {
    cy.viewport(1280, 720);
    cy.visit('https://greenlify.systems/login');
    cy.get('#email').type('Bukanadmin@gmail.com');
    cy.get('#password').type('passworsalahd123');
    cy.get('form > .inline-flex').click();
    cy.wait(2000);
    cy.contains('Login gagal. Periksa email dan password Anda.').should('exist').and('be.visible');
  });
  it('Login Berhasil', () => {
    cy.viewport(1280, 720);
    cy.visit('https://greenlify.systems/login');
    cy.get('#email').type('admin@gmail.com');
    cy.get('#password').type('password123');
    cy.get('form > .inline-flex').click();
    cy.wait(5000);
    cy.contains('Dashboard').should('exist').and('be.visible');
  });
});

describe('Halaman Dashboard', () => {
  it('Element pada halaman Dashboard ditampilkan dengan baik', () =>{
    cy.viewport(1280, 720);
    cy.visit('https://greenlify.systems/login');
    cy.get('#email').type('admin@gmail.com');
    cy.get('#password').type('password123');
    cy.get('form > .inline-flex').click();
    cy.contains('Dashboard').should('exist').and('be.visible');
    cy.contains('Berikut adalah data tentang penggunaan aplikasi dan performa AI yang dapat membantu Anda dalam mengambil keputusan.').should('exist').and('be.visible');
    cy.contains('Total Scan Hari Ini').should('exist').and('be.visible');
    cy.contains('Total Produk').should('exist').and('be.visible');
    cy.contains('Akurasi Model AI').should('exist').and('be.visible');
    cy.contains('Riwayat Scan Terakhir').should('exist').and('be.visible');
    cy.contains('Riwayat scan terakhir yang dilakukan oleh pengguna beserta rekomendasi dan akurasi AI.').should('exist').and('be.visible');
  });
});