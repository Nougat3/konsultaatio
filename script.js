window.addEventListener('load', function() {
    const hbStatus = document.getElementById('hb-status');
    const hbInput = document.getElementById('hb');
    const leukStatus = document.getElementById('leuk-status');
    const leukInput = document.getElementById('leuk');
    const tromStatus = document.getElementById('trom-status');
    const tromInput = document.getElementById('trom');

    hbStatus.addEventListener('change', function() {
        if (hbStatus.value === 'poikkeava') {
            hbInput.style.display = 'block';
        } else {
            hbInput.style.display = 'none';
        }
    });

    leukStatus.addEventListener('change', function() {
        if (leukStatus.value === 'poikkeava') {
            leukInput.style.display = 'block';
        } else {
            leukInput.style.display = 'none';
        }
    });

    tromStatus.addEventListener('change', function() {
        if (tromStatus.value === 'poikkeava') {
            tromInput.style.display = 'block';
        } else {
            tromInput.style.display = 'none';
        }
    });

    document.getElementById('consultationForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const resultDiv = document.getElementById('result');
        let message = 'Hoito-ohjeet:<br>';

        // Hemoglobiini (Hb)
        if (hbStatus.value === 'normaali') {
            message += 'Hb normaali.<br>';
        } else if (hbStatus.value === 'poikkeava') {
            const hbValue = parseFloat(hbInput.value);
            if (hbValue < 90) {
                message += `Hb poikkeava, arvo ${hbValue}, kiireellinen!<br>`;
            } else if (hbValue >= 90 && hbValue < 100) {
                message += `Hb poikkeava, arvo ${hbValue}, puolikiireellinen.<br>`;
            } else if (hbValue <= 20) {
                message += `Hb laskenut alle 20 yksikköä, arvo ${hbValue}, kiireetön.<br>`;
            } else {
                message += `Hb poikkeava, arvo ${hbValue}, kiireetön.<br>`;
            }
        }

        // Leukosyytit (Leuk)
        if (leukStatus.value === 'normaali') {
            message += 'Leuk normaali.<br>';
        } else if (leukStatus.value === 'poikkeava') {
            const leukValue = parseFloat(leukInput.value);
            if (leukValue < 1 || leukValue > 15) {
                message += `Leuk poikkeava, arvo ${leukValue}, kiireellinen!<br>`;
            } else if ((leukValue >= 1 && leukValue <= 3) || (leukValue > 10 && leukValue <= 15)) {
                message += `Leuk poikkeava, arvo ${leukValue}, kiireetön.<br>`;
            }
        }

        // Trombosyytit (Trom)
        if (tromStatus.value === 'normaali') {
            message += 'Trom normaali.<br>';
        } else if (tromStatus.value === 'poikkeava') {
            const tromValue = parseFloat(tromInput.value);
            if (tromValue < 20) {
                message += `Trom poikkeava, arvo ${tromValue}, kiireellinen!<br>`;
            } else if (tromValue >= 20 && tromValue <= 100) {
                message += `Trom poikkeava, arvo ${tromValue}, kiireetön.<br>`;
            }
        }

        resultDiv.innerHTML = message;
    });
});
