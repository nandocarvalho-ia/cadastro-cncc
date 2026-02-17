export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      ciclos_campanha: {
        Row: {
          atualizado_em: string
          criado_em: string
          data_fim: string | null
          data_inicio: string | null
          id: string
          nome_ciclo: string
          oferta_id: string
          status_ciclo: string
          tipo_ciclo: string
        }
        Insert: {
          atualizado_em?: string
          criado_em?: string
          data_fim?: string | null
          data_inicio?: string | null
          id?: string
          nome_ciclo: string
          oferta_id: string
          status_ciclo?: string
          tipo_ciclo: string
        }
        Update: {
          atualizado_em?: string
          criado_em?: string
          data_fim?: string | null
          data_inicio?: string | null
          id?: string
          nome_ciclo?: string
          oferta_id?: string
          status_ciclo?: string
          tipo_ciclo?: string
        }
        Relationships: [
          {
            foreignKeyName: "ciclos_campanha_oferta_id_fkey"
            columns: ["oferta_id"]
            isOneToOne: false
            referencedRelation: "ofertas"
            referencedColumns: ["id"]
          },
        ]
      }
      compras: {
        Row: {
          atualizado_em: string
          ciclo_campanha_id: string | null
          criado_em: string
          forma_pagamento: string | null
          id: string
          lead_id: string
          lead_nome: string | null
          lead_telefone: string | null
          moeda: string
          oferta_id: string
          pago_em: string
          parcelas: number | null
          pedido_externo_id: string | null
          status_pagamento: string
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          valor_bruto: number | null
          valor_liquido: number | null
          valor_pago: number
        }
        Insert: {
          atualizado_em?: string
          ciclo_campanha_id?: string | null
          criado_em?: string
          forma_pagamento?: string | null
          id?: string
          lead_id: string
          lead_nome?: string | null
          lead_telefone?: string | null
          moeda?: string
          oferta_id: string
          pago_em?: string
          parcelas?: number | null
          pedido_externo_id?: string | null
          status_pagamento?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          valor_bruto?: number | null
          valor_liquido?: number | null
          valor_pago: number
        }
        Update: {
          atualizado_em?: string
          ciclo_campanha_id?: string | null
          criado_em?: string
          forma_pagamento?: string | null
          id?: string
          lead_id?: string
          lead_nome?: string | null
          lead_telefone?: string | null
          moeda?: string
          oferta_id?: string
          pago_em?: string
          parcelas?: number | null
          pedido_externo_id?: string | null
          status_pagamento?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          valor_bruto?: number | null
          valor_liquido?: number | null
          valor_pago?: number
        }
        Relationships: [
          {
            foreignKeyName: "compras_ciclo_campanha_id_fkey"
            columns: ["ciclo_campanha_id"]
            isOneToOne: false
            referencedRelation: "ciclos_campanha"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compras_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compras_oferta_id_fkey"
            columns: ["oferta_id"]
            isOneToOne: false
            referencedRelation: "ofertas"
            referencedColumns: ["id"]
          },
        ]
      }
      configuracoes_followup: {
        Row: {
          ativo: boolean
          atualizado_em: string
          ciclo_campanha_id: string | null
          criado_em: string
          delay_1_horas: number
          delay_2_horas: number
          delay_3_horas: number
          escopo: string
          id: string
          janela_fim: string
          janela_inicio: string
          max_followups: number
          oferta_id: string | null
        }
        Insert: {
          ativo?: boolean
          atualizado_em?: string
          ciclo_campanha_id?: string | null
          criado_em?: string
          delay_1_horas?: number
          delay_2_horas?: number
          delay_3_horas?: number
          escopo?: string
          id?: string
          janela_fim?: string
          janela_inicio?: string
          max_followups?: number
          oferta_id?: string | null
        }
        Update: {
          ativo?: boolean
          atualizado_em?: string
          ciclo_campanha_id?: string | null
          criado_em?: string
          delay_1_horas?: number
          delay_2_horas?: number
          delay_3_horas?: number
          escopo?: string
          id?: string
          janela_fim?: string
          janela_inicio?: string
          max_followups?: number
          oferta_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "configuracoes_followup_ciclo_campanha_id_fkey"
            columns: ["ciclo_campanha_id"]
            isOneToOne: false
            referencedRelation: "ciclos_campanha"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "configuracoes_followup_oferta_id_fkey"
            columns: ["oferta_id"]
            isOneToOne: false
            referencedRelation: "ofertas"
            referencedColumns: ["id"]
          },
        ]
      }
      entradas_funil: {
        Row: {
          campanha: string | null
          canal_origem: string | null
          ciclo_campanha_id: string | null
          criado_em: string
          data_entrada: string
          id: string
          lead_id: string
          lead_nome: string | null
          lead_telefone: string | null
          oferta_id: string
          tipo_entrada: string
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          campanha?: string | null
          canal_origem?: string | null
          ciclo_campanha_id?: string | null
          criado_em?: string
          data_entrada?: string
          id?: string
          lead_id: string
          lead_nome?: string | null
          lead_telefone?: string | null
          oferta_id: string
          tipo_entrada: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          campanha?: string | null
          canal_origem?: string | null
          ciclo_campanha_id?: string | null
          criado_em?: string
          data_entrada?: string
          id?: string
          lead_id?: string
          lead_nome?: string | null
          lead_telefone?: string | null
          oferta_id?: string
          tipo_entrada?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entradas_funil_ciclo_campanha_id_fkey"
            columns: ["ciclo_campanha_id"]
            isOneToOne: false
            referencedRelation: "ciclos_campanha"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entradas_funil_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entradas_funil_oferta_id_fkey"
            columns: ["oferta_id"]
            isOneToOne: false
            referencedRelation: "ofertas"
            referencedColumns: ["id"]
          },
        ]
      }
      followups_henrique: {
        Row: {
          agendado_em: string | null
          canal_envio: string
          criado_em: string
          enviado_em: string | null
          id: string
          lead_id: string
          lead_nome: string | null
          lead_telefone: string | null
          mensagem_enviada: string | null
          motivo_cancelamento: string | null
          numero_followup: number
          status_envio: string
          sugestao_followup_id: string | null
        }
        Insert: {
          agendado_em?: string | null
          canal_envio: string
          criado_em?: string
          enviado_em?: string | null
          id?: string
          lead_id: string
          lead_nome?: string | null
          lead_telefone?: string | null
          mensagem_enviada?: string | null
          motivo_cancelamento?: string | null
          numero_followup: number
          status_envio?: string
          sugestao_followup_id?: string | null
        }
        Update: {
          agendado_em?: string | null
          canal_envio?: string
          criado_em?: string
          enviado_em?: string | null
          id?: string
          lead_id?: string
          lead_nome?: string | null
          lead_telefone?: string | null
          mensagem_enviada?: string | null
          motivo_cancelamento?: string | null
          numero_followup?: number
          status_envio?: string
          sugestao_followup_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "followups_henrique_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "followups_henrique_sugestao_followup_id_fkey"
            columns: ["sugestao_followup_id"]
            isOneToOne: false
            referencedRelation: "sugestoes_followup"
            referencedColumns: ["id"]
          },
        ]
      }
      interacoes_lead: {
        Row: {
          canal: string
          criado_em: string
          data_interacao: string
          direcao_mensagem: string
          id: string
          lead_id: string
          lead_nome: string | null
          lead_telefone: string | null
          mensagem: string | null
          origem_interacao: string
        }
        Insert: {
          canal: string
          criado_em?: string
          data_interacao?: string
          direcao_mensagem: string
          id?: string
          lead_id: string
          lead_nome?: string | null
          lead_telefone?: string | null
          mensagem?: string | null
          origem_interacao: string
        }
        Update: {
          canal?: string
          criado_em?: string
          data_interacao?: string
          direcao_mensagem?: string
          id?: string
          lead_id?: string
          lead_nome?: string | null
          lead_telefone?: string | null
          mensagem?: string | null
          origem_interacao?: string
        }
        Relationships: [
          {
            foreignKeyName: "interacoes_lead_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          atualizado_em: string
          cidade: string | null
          criado_em: string
          data_primeira_entrada: string | null
          data_ultima_interacao: string | null
          email: string | null
          estado: string | null
          flag_henrique_ativo: boolean
          id: string
          idioma_preferencial: string | null
          nao_contatar: boolean
          nome_completo: string | null
          origem_principal: string | null
          pontuacao_mql: number
          primeiro_nome: string | null
          status_relacionamento: string | null
          telefone: string
          temperatura_lead: string | null
          ultimos_8: string | null
        }
        Insert: {
          atualizado_em?: string
          cidade?: string | null
          criado_em?: string
          data_primeira_entrada?: string | null
          data_ultima_interacao?: string | null
          email?: string | null
          estado?: string | null
          flag_henrique_ativo?: boolean
          id?: string
          idioma_preferencial?: string | null
          nao_contatar?: boolean
          nome_completo?: string | null
          origem_principal?: string | null
          pontuacao_mql?: number
          primeiro_nome?: string | null
          status_relacionamento?: string | null
          telefone: string
          temperatura_lead?: string | null
          ultimos_8?: string | null
        }
        Update: {
          atualizado_em?: string
          cidade?: string | null
          criado_em?: string
          data_primeira_entrada?: string | null
          data_ultima_interacao?: string | null
          email?: string | null
          estado?: string | null
          flag_henrique_ativo?: boolean
          id?: string
          idioma_preferencial?: string | null
          nao_contatar?: boolean
          nome_completo?: string | null
          origem_principal?: string | null
          pontuacao_mql?: number
          primeiro_nome?: string | null
          status_relacionamento?: string | null
          telefone?: string
          temperatura_lead?: string | null
          ultimos_8?: string | null
        }
        Relationships: []
      }
      mapa_produtos_checkout: {
        Row: {
          ativo: boolean
          atualizado_em: string
          criado_em: string
          id: string
          oferta_id: string
          produto_nome_checkout: string
        }
        Insert: {
          ativo?: boolean
          atualizado_em?: string
          criado_em?: string
          id?: string
          oferta_id: string
          produto_nome_checkout: string
        }
        Update: {
          ativo?: boolean
          atualizado_em?: string
          criado_em?: string
          id?: string
          oferta_id?: string
          produto_nome_checkout?: string
        }
        Relationships: [
          {
            foreignKeyName: "mapa_produtos_checkout_oferta_id_fkey"
            columns: ["oferta_id"]
            isOneToOne: false
            referencedRelation: "ofertas"
            referencedColumns: ["id"]
          },
        ]
      }
      ofertas: {
        Row: {
          ativo: boolean
          atualizado_em: string
          criado_em: string
          id: string
          idioma: string | null
          nome_oferta: string
          produto_hotmart_id: number | null
          produto_id: string | null
          tipo_oferta: string
          valor_referencia: number | null
        }
        Insert: {
          ativo?: boolean
          atualizado_em?: string
          criado_em?: string
          id?: string
          idioma?: string | null
          nome_oferta: string
          produto_hotmart_id?: number | null
          produto_id?: string | null
          tipo_oferta: string
          valor_referencia?: number | null
        }
        Update: {
          ativo?: boolean
          atualizado_em?: string
          criado_em?: string
          id?: string
          idioma?: string | null
          nome_oferta?: string
          produto_hotmart_id?: number | null
          produto_id?: string | null
          tipo_oferta?: string
          valor_referencia?: number | null
        }
        Relationships: []
      }
      respostas_onboarding: {
        Row: {
          chave_pergunta: string
          criado_em: string
          entrada_funil_id: string | null
          id: string
          lead_id: string
          lead_nome: string | null
          lead_telefone: string | null
          respondido_em: string
          resposta_booleano: boolean | null
          resposta_numero: number | null
          resposta_texto: string | null
          versao_formulario: string
        }
        Insert: {
          chave_pergunta: string
          criado_em?: string
          entrada_funil_id?: string | null
          id?: string
          lead_id: string
          lead_nome?: string | null
          lead_telefone?: string | null
          respondido_em?: string
          resposta_booleano?: boolean | null
          resposta_numero?: number | null
          resposta_texto?: string | null
          versao_formulario?: string
        }
        Update: {
          chave_pergunta?: string
          criado_em?: string
          entrada_funil_id?: string | null
          id?: string
          lead_id?: string
          lead_nome?: string | null
          lead_telefone?: string | null
          respondido_em?: string
          resposta_booleano?: boolean | null
          resposta_numero?: number | null
          resposta_texto?: string | null
          versao_formulario?: string
        }
        Relationships: [
          {
            foreignKeyName: "respostas_onboarding_entrada_funil_id_fkey"
            columns: ["entrada_funil_id"]
            isOneToOne: false
            referencedRelation: "entradas_funil"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "respostas_onboarding_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      sugestoes_followup: {
        Row: {
          criado_em: string
          eh_mais_recente: boolean
          id: string
          lead_id: string
          lead_nome: string | null
          lead_telefone: string | null
          origem_sugestao: string
          pontuacao_confianca: number | null
          sugestao_texto: string
        }
        Insert: {
          criado_em?: string
          eh_mais_recente?: boolean
          id?: string
          lead_id: string
          lead_nome?: string | null
          lead_telefone?: string | null
          origem_sugestao?: string
          pontuacao_confianca?: number | null
          sugestao_texto: string
        }
        Update: {
          criado_em?: string
          eh_mais_recente?: boolean
          id?: string
          lead_id?: string
          lead_nome?: string | null
          lead_telefone?: string | null
          origem_sugestao?: string
          pontuacao_confianca?: number | null
          sugestao_texto?: string
        }
        Relationships: [
          {
            foreignKeyName: "sugestoes_followup_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      vw_onboarding_respostas_amigavel: {
        Row: {
          area_atuacao: string | null
          assunto_principal_conversa_texto: string | null
          conhece_creditos_carbono_tempo: string | null
          email: string | null
          enquadramento_profissional: string | null
          entrada_funil_id: string | null
          estado: string | null
          expectativa_evento_texto: string | null
          faixa_etaria: string | null
          faixa_renda_mensal: string | null
          genero: string | null
          ja_estudou_creditos_carbono: string | null
          lead_id: string | null
          maior_desafio_area: string | null
          maior_dificuldade_texto: string | null
          nome: string | null
          respondido_em: string | null
          telefone: string | null
        }
        Relationships: [
          {
            foreignKeyName: "respostas_onboarding_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
