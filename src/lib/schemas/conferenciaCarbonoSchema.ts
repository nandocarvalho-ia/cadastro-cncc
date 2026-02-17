import { z } from "zod";

export const conferenceSchema = z.object({
  email: z.string().email("Digite um e-mail válido"),
  genero: z.string().min(1, "Campo obrigatório"),
  faixaEtaria: z.string().min(1, "Campo obrigatório"),
  estado: z.string().min(1, "Campo obrigatório"),
  enquadramentoProfissional: z.string().min(1, "Campo obrigatório"),
  areaAtuacao: z.string().min(1, "Campo obrigatório"),
  maiorDesafioArea: z.string().min(1, "Campo obrigatório"),
  rendaMensal: z.string().min(1, "Campo obrigatório"),
  conheceDrSanquettaHaQuantoTempo: z.string().min(1, "Campo obrigatório"),
  jaEstudouCreditosCarbono: z.string().min(1, "Campo obrigatório"),
  maiorDificuldadeNoAssunto: z.string().min(10, "Escreva pelo menos 10 caracteres"),
  expectativaCursoInteresse: z.string().min(10, "Escreva pelo menos 10 caracteres"),
  assuntoPrincipalCafe: z.string().min(10, "Escreva pelo menos 10 caracteres"),
});

export type ConferenceFormData = z.infer<typeof conferenceSchema>;
export type QuestionType = "text" | "email" | "phone" | "textarea" | "options" | "select";

export interface Question {
  id: keyof ConferenceFormData;
  question: string;
  type: QuestionType;
  placeholder?: string;
  options?: string[];
}

export const QUESTIONS: Question[] = [
  {
    id: "email",
    question: "E-mail",
    type: "email",
    placeholder: "Seu e-mail",
  },
  {
    id: "genero",
    question: "Qual o seu gênero?",
    type: "options",
    options: ["Masculino", "Feminino", "Prefiro não dizer", "Outro"],
  },
  {
    id: "faixaEtaria",
    question: "Qual sua faixa etária?",
    type: "options",
    options: ["18 a 24", "25 a 34", "35 a 44", "45 a 54", "55 a 64", "65+"],
  },
  {
    id: "estado",
    question: "Qual seu estado?",
    type: "select",
    options: [
      "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS",
      "MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
    ],
  },
  {
    id: "enquadramentoProfissional",
    question: "Qual é seu enquadramento profissional?",
    type: "options",
    options: [
      "Colaborador de empresa/instituição privada",
      "Colaborador de empresa/instituição pública",
      "Empresário (escritório de advocacia)",
      "Empresário (consultorias)",
      "Colaborador de ONG",
      "Estudante e/ou estagiário",
      "Outro",
    ],
  },
  {
    id: "areaAtuacao",
    question: "Qual sua área de atuação?",
    type: "options",
    options: [
      "Educacional",
      "Administrativa",
      "Financeira (Economistas, Investidores ou áreas afins)",
      "Jurídica",
      "Florestal",
      "Outro",
    ],
  },
  {
    id: "maiorDesafioArea",
    question: "Qual seu maior desafio nessa área?",
    type: "options",
    options: [
      "Entender qual é a melhor área dentro desse mercado para trabalhar",
      "Conseguir tempo para estudar e se capacitar",
      "Encontrar pessoas confiáveis para ajudar no processo ou formar parcerias",
      "Encontrar clientes para esse tipo de serviço",
    ],
  },
  {
    id: "rendaMensal",
    question: "Qual é a sua renda mensal?",
    type: "options",
    options: [
      "Menos de R$3.000,00",
      "Entre R$3.000,00 e R$6.000,00",
      "Entre R$6.000,00 e R$10.000,00",
      "Mais de R$10.000,00",
    ],
  },
  {
    id: "conheceDrSanquettaHaQuantoTempo",
    question: "Há quanto tempo você conhece o Dr. Sanquetta?",
    type: "options",
    options: [
      "Acabei de conhecer através dos anúncios do evento",
      "Há mais ou menos 6 meses",
      "Há pouco tempo (cerca de 1 a 3 meses)",
      "Há mais de 12 meses",
    ],
  },
  {
    id: "jaEstudouCreditosCarbono",
    question: "Alguma vez você já estudou sobre Créditos de Carbono?",
    type: "options",
    options: [
      "Não, é a primeira vez que tenho contato sobre o assunto",
      "Sim, mas aprendi pouca coisa",
      "Sim, já tenho uma base sobre o assunto",
      "Outro",
    ],
  },
  {
    id: "maiorDificuldadeNoAssunto",
    question: "Qual você imagina que seja sua maior dificuldade nesse assunto? Descreva de forma simples.",
    type: "textarea",
    placeholder: "Sua resposta",
  },
  {
    id: "expectativaCursoInteresse",
    question: "Qual é a sua expectativa com relação ao curso? Tem interesse em algum assunto específico?",
    type: "textarea",
    placeholder: "Sua resposta",
  },
  {
    id: "assuntoPrincipalCafe",
    question: "Se a gente sentasse para tomar um café, qual seria o principal assunto de conversa sobre créditos de carbono?",
    type: "textarea",
    placeholder: "Sua resposta",
  },
];
