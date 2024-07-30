window.addEventListener('load', function() {
    document.getElementById('consultationForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        const resultDiv = document.getElementById('result');
        let message = 'Hoito-ohjeet:<br>';

        // Hemoglobiini (Hb)
        if (data.hb < 90) {
            message += 'Hb alle 90, kiireellinen!<br>';
        } else if (data.hb >= 90 && data.hb < 100) {
            message += 'Hb 90-100, puolikiireellinen.<br>';
        } else if (data.hb <= 20) {
            message += 'Hb laskenut alle 20 yksikköä, kiireetön.<br>';
        } else {
            message += 'Hb yli 100, kiireetön.<br>';
        }

        // Leukosyytit (Leuk)
        if (data.leuk < 1 || data.leuk > 15) {
            message += 'Leuk alle 1 tai yli 15, kiireellinen!<br>';
        } else if ((data.leuk >= 1 && data.leuk <= 3) || (data.leuk > 10 && data.leuk <= 15)) {
            message += 'Leuk 1-3 tai 10-15, kiireetön.<br>';
        }

        // Trombosyytit (Trom)
        if (data.trom < 20) {
            message += 'Trom alle 20, kiireellinen!<br>';
        } else if (data.trom >= 20 && data.trom <= 100) {
            message += 'Trom 20-100, kiireetön.<br>';
        }

        // Kalium (K)
        if (data.k < 3.0 || data.k > 5.5) {
            message += 'K alle 3.0 tai yli 5.5, kiireellinen!<br>';
        } else if ((data.k >= 3.0 && data.k <= 3.2) || (data.k >= 5.0 && data.k <= 5.5)) {
            message += 'K 3.0-3.2 tai 5.0-5.5, kiireetön.<br>';
        }

        // Natrium (Na)
        if (data.na < 127) {
            message += 'Na alle 127, kiireellinen!<br>';
        } else if (data.na >= 127 && data.na <= 130) {
            message += 'Na 127-130, kiireetön.<br>';
        }

        // Kreatiniini (Krea)
        if (data.krea > 50) {
            message += 'Krea noussut yli 50 yksikköä aiemmasta, kiireellinen!<br>';
        } else if (data.krea >= 30 && data.krea <= 50) {
            message += 'Krea noussut 30-50 yksikköä aiemmasta, kiireetön.<br>';
        }

        // CRP
        if (data.crp > 40) {
            message += 'CRP yli 40, kiireellinen!<br>';
        } else if (data.crp >= 20 && data.crp <= 40) {
            message += 'CRP 20-40, kiireetön.<br>';
        }

        // Verensokeri (Vs)
        if (data.vs < 5 || data.vs > 18) {
            message += 'Vs alle 5 tai yli 18, kiireellinen!<br>';
        } else if ((data.vs >= 5 && data.vs <= 6) || (data.vs >= 16 && data.vs <= 18)) {
            message += 'Vs 5-6 tai 16-18, kiireetön.<br>';
        }

        // Ionisoitu kalsium (Ca-ion)
        if (data.ca < 0.9 || data.ca > 1.6) {
            message += 'Ca-ion alle 0.9 tai yli 1.6, kiireellinen!<br>';
        } else if ((data.ca >= 0.9 && data.ca <= 1.05) || (data.ca >= 1.5 && data.ca <= 1.6)) {
            message += 'Ca-ion 0.9-1.05 tai 1.5-1.6, kiireetön.<br>';
        } else if ((data.ca >= 1.06 && data.ca <= 1.19) || (data.ca >= 1.34 && data.ca <= 1.49)) {
            message += 'Ca-ion 1.06-1.19 tai 1.34-1.49, kiireetön.<br>';
        }

        // TSH ja T4V/T3V
        if (data.tsh < 0.3 || data.tsh > 10) {
            message += 'TSH alle 0.3 tai yli 10, tilaa T4-V ja T3-V seuraavalle päivälle, kiireellinen!<br>';
        } else if (data.t4v > 23 || data.t3v > 6.5) {
            message += 'T4-V yli 23 tai T3-V yli 6.5 eikä Thyroxinia käytössä, hätätilanne!<br>';
        } else {
            message += 'TSH viitealueelta poikkeavat arvot, kiireetön.<br>';
        }

        // Verenpaine
        if (data.bp_systolic > 200 || data.bp_diastolic > 130 || data.bp_systolic < 90 || data.bp_diastolic < 50) {
            message += 'BP yli 200/130 tai alle 90/50, kiireellinen!<br>';
        } else if ((data.bp_systolic >= 170 && data.bp_systolic <= 199) || (data.bp_diastolic >= 100 && data.bp_diastolic <= 129)) {
            message += 'BP 170-199/100-129, puolikiireellinen.<br>';
        } else if ((data.bp_systolic >= 150 && data.bp_systolic <= 169) || (data.bp_diastolic >= 90 && data.bp_diastolic <= 99) || (data.bp_systolic >= 105 && data.bp_systolic <= 120) || (data.bp_diastolic >= 55 && data.bp_diastolic <= 65)) {
            message += 'BP 150-169/90-99 tai 105-120/55-65, kiireetön.<br>';
        }

        // Pulssi
        if (data.pulse < 40 || data.pulse > 110) {
            message += 'Pulssi alle 40 tai yli 110, kiireellinen!<br>';
        } else if ((data.pulse >= 40 && data.pulse <= 50) || (data.pulse >= 100 && data.pulse <= 110)) {
            message += 'Pulssi 40-50 tai 100-110, kiireetön.<br>';
        }

        // Saturaatio
        if (data.saturation < 92) {
            message += 'Saturaatio alle 92 %, tupakoitsijalla alle 88 %, kiireellinen!<br>';
        }

        // Hengitystiheys
        if (data.respiratory < 12 || data.respiratory > 20) {
            message += 'Hengitystiheys alle 12 tai yli 20, kiireellinen!<br>';
        }

        // Paino
        if (data.weight > 5) {
            message += 'Painonnousu yli 5 kg, kiireellinen!<br>';
        } else if (data.weight <= 5 && data.weight > 2) {
            message += 'Painonnousu 2-5 kg, puolikiireellinen.<br>';
        } else if (data.weight < -3) {
            message += 'Painonlasku yli 3 kg viimeisen kolmen kuukauden aikana, kiireetön.<br>';
        }

        resultDiv.innerHTML = message;
    });
});
