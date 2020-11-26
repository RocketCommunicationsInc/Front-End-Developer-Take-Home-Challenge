export class Nite {
    map: null;
    date: null;
    sunPosition: google.maps.LatLng;
    earthRadiusMeters: 6371008;
    markerTwilightCivil: google.maps.Circle;
    markerTwilightNautical: google.maps.Circle;
    markerTwilightAstronomical: google.maps.Circle;
    markerNight: google.maps.Circle;


    init(map): void {
        if (typeof google === 'undefined'
           || typeof google.maps === 'undefined') { throw new Error('Nite Overlay: no google.maps detected'); }

        this.map = map;
        this.sunPosition = this.calculatePositionOfSun();

        this.markerTwilightCivil = new google.maps.Circle({
            map: this.map,
            center: this.getShadowPosition(),
            radius: this.getShadowRadiusFromAngle(0.566666),
            fillColor: '#000',
            fillOpacity: 0.1,
            strokeOpacity: 0,
            clickable: false,
            editable: false
        });
        this.markerTwilightNautical = new google.maps.Circle({
            map: this.map,
            center: this.getShadowPosition(),
            radius: this.getShadowRadiusFromAngle(6),
            fillColor: '#000',
            fillOpacity: 0.1,
            strokeOpacity: 0,
            clickable: false,
            editable: false
        });
        this.markerTwilightAstronomical = new google.maps.Circle({
            map: this.map,
            center: this.getShadowPosition(),
            radius: this.getShadowRadiusFromAngle(12),
            fillColor: '#000',
            fillOpacity: 0.1,
            strokeOpacity: 0,
            clickable: false,
            editable: false
        });
        this.markerNight = new google.maps.Circle({
            map: this.map,
            center: this.getShadowPosition(),
            radius: this.getShadowRadiusFromAngle(18),
            fillColor: '#000',
            fillOpacity: 0.1,
            strokeOpacity: 0,
            clickable: false,
            editable: false
        });
    }

    getShadowRadiusFromAngle(angle): number {
        const shadowRadius =  this.earthRadiusMeters * Math.PI * 0.5;
        const twilightDist = ((this.earthRadiusMeters * 2 * Math.PI) / 360) * angle;
        return shadowRadius - twilightDist;
    }

    getSunPosition(): google.maps.LatLng {
        return this.sunPosition;
    }

    getShadowPosition(): google.maps.LatLng {
        return (this.sunPosition) ? new google.maps.LatLng(-this.sunPosition.lat(), this.sunPosition.lng() + 180) : null;
    }

    refresh(): void {
        if (!this.isVisible()) { return; }
        this.sunPosition = this.calculatePositionOfSun(this.date);
        const shadowPosition = this.getShadowPosition();
        this.markerTwilightCivil.setCenter(shadowPosition);
        this.markerTwilightNautical.setCenter(shadowPosition);
        this.markerTwilightAstronomical.setCenter(shadowPosition);
        this.markerNight.setCenter(shadowPosition);
    }

    jday(date): number {
        return (date.getTime() / 86400000.0) + 2440587.5;
    }

    calculatePositionOfSun(date = new Date()): google.maps.LatLng {
        date = (date instanceof Date) ? date : new Date();

        const rad = 0.017453292519943295;

        // based on NOAA solar calculations
        const msPastMidnight = ((date.getUTCHours() * 60 + date.getUTCMinutes()) *
                                60 + date.getUTCSeconds()) * 1000 + date.getUTCMilliseconds();
        const jc = (this.jday(date) - 2451545) / 36525;
        const meanLongSun = (280.46646 + jc * (36000.76983 + jc * 0.0003032)) % 360;
        const meanAnomSun = 357.52911 + jc * (35999.05029 - 0.0001537 * jc);
        const sunEq = Math.sin(rad * meanAnomSun) * (1.914602 - jc * (0.004817 + 0.000014 * jc)) +
                    Math.sin(rad * 2 * meanAnomSun) * (0.019993 - 0.000101 * jc) +
                    Math.sin(rad * 3 * meanAnomSun) * 0.000289;

        const sunTrueLong = meanLongSun + sunEq;
        const sunAppLong = sunTrueLong - 0.00569 - 0.00478 * Math.sin(rad * 125.04 - 1934.136 * jc);
        const meanObliqEcliptic = 23 + (26 + ((21.448 - jc * (46.815 + jc * (0.00059 - jc * 0.001813)))) / 60) / 60;
        const obliqCorr = meanObliqEcliptic + 0.00256 * Math.cos(rad * 125.04 - 1934.136 * jc);

        const lat = Math.asin(Math.sin(rad * obliqCorr) * Math.sin(rad * sunAppLong)) / rad;

        const eccent = 0.016708634 - jc * (0.000042037 + 0.0000001267 * jc);
        const y = Math.tan(rad * (obliqCorr / 2)) * Math.tan(rad * (obliqCorr / 2));
        const rqOfTime = 4 * ((y * Math.sin(2 * rad * meanLongSun) - 2 * eccent *
                        Math.sin(rad * meanAnomSun) + 4 * eccent * y *
                        Math.sin(rad * meanAnomSun) *
                        Math.cos(2 * rad * meanLongSun) - 0.5 * y * y *
                        Math.sin(4 * rad * meanLongSun) - 1.25 * eccent * eccent *
                        Math.sin(2 * rad * meanAnomSun)) / rad);

        const trueSolarTimeInDeg = ((msPastMidnight + rqOfTime * 60000) % 86400000) / 240000;
        const lng = -((trueSolarTimeInDeg < 0) ? trueSolarTimeInDeg + 180 : trueSolarTimeInDeg - 180);

        return new google.maps.LatLng(lat, lng);
    }

    setDate(date): void{
        this.date = date;
        this.refresh();
    }

    setMap(map): void {
        this.map = map;
        this.markerTwilightCivil.setMap(this.map);
        this.markerTwilightNautical.setMap(this.map);
        this.markerTwilightAstronomical.setMap(this.map);
        this.markerNight.setMap(this.map);
    }

    show(): void {
        this.markerTwilightCivil.setVisible(true);
        this.markerTwilightNautical.setVisible(true);
        this.markerTwilightAstronomical.setVisible(true);
        this.markerNight.setVisible(true);
        this.refresh();
    }

    hide(): void {
        this.markerTwilightCivil.setVisible(false);
        this.markerTwilightNautical.setVisible(false);
        this.markerTwilightAstronomical.setVisible(false);
        this.markerNight.setVisible(false);
    }

    isVisible(): boolean {
        return this.markerNight.getVisible();
    }
}
