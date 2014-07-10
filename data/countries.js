var restcountries = require('./restcountries');

exports.getCountryByName = function (country_name) {
    var country_names = restcountries.countries.map(function (country) {
        return country.name.toLowerCase();
    });
    var index = country_names.indexOf(country_name);
    return restcountries.countries[index];
};

exports.getCountriesByLanguageCode = function (code){
    return restcountries.countries.filter(function (country_obj) {
        return country_obj.languages.indexOf(code) !== -1;
    });
};