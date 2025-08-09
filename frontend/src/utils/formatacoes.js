
const enum_D = {
  atas: "Atas",
  plano_de_atividades: "Plano de Atividades",
  avisos: "Avisos",
  editais: "Editais",
  regulamentos: "Regulamentos",
  relatorios_de_contas: "Relatórios de Contas",
  outro: "Outro"
};


export function formatarEnum_D(value) {
  return enum_D[value] || value;
}
