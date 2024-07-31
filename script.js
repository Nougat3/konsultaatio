window.addEventListener('load', function() {
    const fields = [
        { id: 'hb', statusId: 'hb-status' },
        { id: 'leuk', statusId: 'leuk-status' },
        { id: 'trom', statusId: 'trom-status' }
    ];

    fields.forEach(field => {
        const statusElement = document.getElementById(field.statusId);
        const inputElement = document.getElementById(field.id);
        
        statusElement.addEventListener('change', function() {
            inputElement.style.display = statusElement.value === 'poikkeava' ? 'block' : 'none';
        });
    });

    document.getElementById('consultationForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const resultDiv = document.getElementById('result');
        let message = '<h2>Hoito-ohjeet:</h2>';

        fields.forEach(field => {
            const statusElement = document.getElementById(field.statusId);
            const inputElement = document.getElementById(field.id);

            if (statusElement.value === 'normaali') {
                message += `<h3>${field.id.toUpperCase()}</h3><p>Normaalit viitearvot. Arvo on normaali.</p>`;
            } else if (statusElement.value === 'poikkeava') {
                const value = parseFloat(inputElement.value);
                message += `<h3>${field.id.toUpperCase()}</h3><p>Arvo: ${value}</p><p>Poikkeavuudet ja mahdolliset syyt:</p>`;
                switch (field.id) {
                    case 'hb':
                        message += `<p>Normaaliarvot:</p><p>Miehet: 134–167 g/l</p><p>Naiset: 117–155 g/l</p>`;
                        if (value < 117) message += `<p><strong>Matala Hb:</strong> Anemia, krooniset sairaudet, verenvuoto. Arvo: ${value}, kiireellinen!</p>`;
                        else if (value < 134) message += `<p><strong>Matala Hb:</strong> Anemia, krooniset sairaudet, verenvuoto. Arvo: ${value}, puolikiireellinen.</p>`;
                        else if (value > 167) message += `<p><strong>Korkea Hb:</strong> Polysytemia, krooninen keuhkosairaus, kuivuminen. Arvo: ${value}, kiireetön.</p>`;
                        break;
                    case 'leuk':
                        message += `<p>Normaaliarvot:</p><p>Aikuiset: 3.4–8.2 x 10^9/l</p>`;
                        if (value < 3.4) message += `<p><strong>Matala Leuk:</strong> Infektiot, luuydinsairaudet, autoimmuunisairaudet. Arvo: ${value}, kiireellinen!</p>`;
                        else if (value > 8.2) message += `<p><strong>Korkea Leuk:</strong> Infektiot, tulehdukset, leukemiat. Arvo: ${value}, kiireellinen!</p>`;
                        break;
                    case 'trom':
                        message += `<p>Normaaliarvot:</p><p>Aikuiset: 150–360 x 10^9/l</p>`;
                        if (value < 150) message += `<p><strong>Matala Trom:</strong> Verenvuototaipumus, luuydinsairaudet, lääkkeiden sivuvaikutukset. Arvo: ${value}, kiireellinen!</p>`;
                        else if (value > 360) message += `<p><strong>Korkea Trom:</strong> Tulehdukset, krooniset sairaudet, syöpä. Arvo: ${value}, kiireetön.</p>`;
                        break;
                }
            }
        });

        resultDiv.innerHTML = message;
    });
});
