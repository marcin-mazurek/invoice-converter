const tag = require('../utils/xml-tag');

module.exports = function (invoice) {
  const children = [
    tag('Kontrahent', { RodzKon: '', Nazwa: '', UlicaDom: '', Miasto: '', Kod: '', Kraj: '' })
  ];

  invoice.forEach((item, index) => {
    children.push(tag('TowaryFakt', {
      NrPozNaFakt: index + 1,
      KodCNTow: item.cnCode,
      KodTaricTow: item.taricCode,
      NazwaPolska: item.name,
      IloscTow: item.quantity,
      IloscUzupTow: item.quantity,
      LiczbaOpakTow: '0',
      JednUzup: 'szt.',
      JednMiary: 'szt.',
      WartoscTow: item.priceAfterRebate,
      MasaNettoTow: item.weightNet,
      MasaBruttoTow: item.weightGross,
      RodzajOpakTow: 'PA',
      ZnakiOpakTow: 'B/Z'
    }));
  });

  return tag('SADFaktura', {
    NrFaktury: '',
    DataWystawienia: '',
    WalutaFaktury: '',
    KodDokWym: ''
  },
  children);
};
