function beli(produk, harga) {
    localStorage.removeItem('selectedProduk');
    localStorage.setItem('selectedProduk', JSON.stringify({ produk, harga }));
    window.location.href = 'transaksi.html';
}

function buatPesanan() {
    const nama = document.getElementById('nama').value.trim();
    const alamat = document.getElementById('alamat').value.trim();
    const jumlah = parseInt(document.getElementById('jumlah').value, 10);

    if (!nama || !alamat || isNaN(jumlah) || jumlah <= 0) {
        alert('Tolong Isi Semua Kolom dengan benar!');
        return;
    }
    
    let carcol = '';
    let price = 0;
    
    if (document.getElementById('blok').checked) {
        carcol = 'blok';
        price = document.getElementById('blok').getAttribute('data-price');
    } else if (document.getElementById('pipe').checked) {
        carcol = 'pipe';
        price = document.getElementById('pipe').getAttribute('data-price');
    } else if (document.getElementById('hexagonal').checked) {
        carcol = 'hexagonal';
        price = document.getElementById('hexagonal').getAttribute('data-price');
    } else {
        alert('Pilih Pesanan Anda.');
        return;
    }

    
    const totalPrice = jumlah * price;

    const params = new URLSearchParams({
        nama,
        alamat,
        carcol,
        jumlah,
        price: totalPrice,
    });

    window.location.href = `invoice.html?${params.toString()}`;
}

// Load data from URL parameters into invoice page
window.addEventListener('load', () => {
    if (window.location.pathname.endsWith('invoice.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        document.getElementById('Nama').textContent = urlParams.get('nama');
        document.getElementById('Alamat').textContent = urlParams.get('alamat');
        document.getElementById('Produk').textContent = urlParams.get('carcol');
        document.getElementById('jumlah').textContent = urlParams.get('jumlah');
        document.getElementById('Total').textContent = 'Rp ' + new Intl.NumberFormat('id-ID').format(urlParams.get('price'));
    }
});
