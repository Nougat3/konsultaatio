window.addEventListener('load', function() {
    const fields = [
        { id: 'hb', statusId: 'hb-status', currentId: 'hb-current', currentDateId: 'hb-current-date', previousId: 'hb-previous', previousDateId: 'hb-previous-date' },
        { id: 'leuk', statusId: 'leuk-status', currentId: 'leuk-current', currentDateId: 'leuk-current-date', previousId: 'leuk-previous', previousDateId: 'leuk-previous-date' },
        { id: 'trom', statusId: 'trom-status', currentId: 'trom-current', currentDateId: 'trom-current-date', previousId: 'trom-previous', previousDateId: 'trom-previous-date' }
    ];

    fields.forEach(field => {
        const statusElement = document.getElementById(field.statusId);
        const currentElement = document.getElementById(field.currentId);
        const currentDateElement = document.getElementById(field.currentDateId);
        const previousElement = document.getElementById(field.previousId);
        const previousDateElement = document.getElementById(field.previousDateId);
        
        statusElement.addEventListener('change', function() {
            const displayStyle = statusElement.value === 'poikkeava' ? 'block' : 'none';
            currentElement.style.display = displayStyle;
            currentDateElement.style.display = displayStyle;
            previousElement.style.display = displayStyle;
            previousDateElement.style.display = displayStyle;
        });
    });

    document.getElementById('consultationForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const resultDiv = document.getElementById('result');
        let message = '<h2>Hoito-ohjeet:</h2>';

        fields.forEach(field => {
            const statusElement = document.getElementById(field.statusId);
            const currentElement = document.getElementById(field.currentId);
            const currentDateElement = document.getElementById(field.currentDateId);
            const previousElement = document.getElementById(field.previousId);
            const previousDateElement = document.getElementById(field.previousDateId);

            if (statusElement.value === 'normaali') {
                message += `<h3>${field.id.toUpperCase()}</h3><p>Verikoe normaaleissa viitearvoissa.</p>`;
            } else if (statusElement.value === 'poikkeava') {
                const currentValue = parseFloat(currentElement.value);
                const previousValue = parseFloat(previousElement.value);
                const currentDate = new Date(currentDateElement.value);
                const previousDate = new Date(previousDateElement.value);
                const change = currentValue - previousValue;
                const daysBetween = Math.floor((currentDate - previousDate) / (1000 * 60 * 60 * 24));
                message += `<h3>${field.id.toUpperCase()}</h3><p>Nykyinen arvo: ${currentValue} (${currentDate.toLocaleDateString()})</p><p>Edellinen arvo: ${previousValue} (${previousDate.toLocaleDateString()})</p><p>Muutos: ${change} (${daysBetween} päivää sitten)</p>`;
                
                switch (field.id) {
                    case 'hb':
                        message += `<p>Normaaliarvot:</p><p>Miehet: 134–167 g/l</p><p>Naiset: 117–155 g/l</p>`;
                        if (currentValue < 90 || change < -20) {
                            message += `<p><strong>Matala Hb:</strong> Hb alle 90 ja/tai Hb laskenut nopeasti yli 20 yksikköä. Kiireellinen! Mahdolliset syyt: Anemia, krooniset sairaudet, verenvuoto.</p>`;
                        } else if (currentValue < 100) {
                            message += `<p><strong>Matala Hb:</strong> Hb tasolla 90-100. Puolikiireellinen. Mahdolliset syyt: Anemia, krooniset sairaudet, verenvuoto.</p>`;
                        } else if (currentValue <= 20) {
                            message += `<p><strong>Matala Hb:</strong> Hb laskenut alle 20 yksikköä ja Hb on yli 100. Kiireetön. Mahdolliset syyt: Anemia, krooniset sairaudet, verenvuoto.</p>`;
                        } else if (currentValue > 167) {
                            message += `<p><strong>Korkea Hb:</strong> Polysytemia, krooninen keuhkosairaus, kuivuminen. Arvo: ${currentValue}, kiireetön.</p>`;
                        }
                        break;
                    case 'leuk':
                        message += `<p>Normaaliarvot:</p><p>Aikuiset: 3.4–8.2 x 10^9/l</p>`;
                        if (currentValue < 1 || currentValue > 15) {
                            message += `<p><strong>Poikkeava Leuk:</strong> Leuk alle 1.0 tai yli 15 uutena löydöksenä. Kiireellinen! Mahdolliset syyt: Infektiot, tulehdukset, leukemiat.</p>`;
                        } else if (currentValue >= 1 && currentValue <= 3 || currentValue >= 10 && currentValue <= 15) {
                            message += `<p><strong>Poikkeava Leuk:</strong> Leuk 1-3 tai 10-15 uutena löydöksenä ja lievät infektio-oireet. Kiireetön. Mahdolliset syyt: Infektiot, luuydinsairaudet, autoimmuunisairaudet.</p>`;
                        }
                        break;
                    case 'trom':
                        message += `<p>Normaaliarvot:</p><p>Aikuiset: 150–360 x 10^9/l</p>`;
                        if (currentValue < 20) {
                            message += `<p><strong>Matala Trom:</strong> Trom alle 20. Kiireellinen! Mahdolliset syyt: Verenvuototaipumus, luuydinsairaudet, lääkkeiden sivuvaikutukset.</p>`;
                        } else if (currentValue >= 20 && currentValue <= 100) {
                            message += `<p><strong>Poikkeava Trom:</strong> Trom 20-100 uutena löydöksenä. Kiireetön. Mahdolliset syyt: Verenvuototaipumus, luuydinsairaudet, lääkkeiden sivuvaikutukset.</p>`;
                        } else if (currentValue > 360) {
                            message += `<p><strong>Korkea Trom:</strong> Tulehdukset, krooniset sairaudet, syöpä. Arvo: ${currentValue}, kiireetön.</p>`;
                        }
                        break;
                }
            }
        });

        resultDiv.innerHTML = message;
    });
});
