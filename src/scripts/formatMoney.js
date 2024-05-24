export default function formatMoney(value) {
  if (value) {
    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  }
}