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
      atendimentos_comerciais: {
        Row: {
          atualizado_em: string
          criado_em: string
          data_proxima_acao: string | null
          encerrado_em: string | null
          etapa_funil: string | null
          id: string
          iniciado_em: string
          lead_id: string
          observacoes: string | null
          produto: string | null
          proxima_acao: string | null
          status: string
          valor_venda: number | null
          vendedor_id: string | null
          vendedor_nome: string | null
        }
        Insert: {
          atualizado_em?: string
          criado_em?: string
          data_proxima_acao?: string | null
          encerrado_em?: string | null
          etapa_funil?: string | null
          id?: string
          iniciado_em?: string
          lead_id: string
          observacoes?: string | null
          produto?: string | null
          proxima_acao?: string | null
          status?: string
          valor_venda?: number | null
          vendedor_id?: string | null
          vendedor_nome?: string | null
        }
        Update: {
          atualizado_em?: string
          criado_em?: string
          data_proxima_acao?: string | null
          encerrado_em?: string | null
          etapa_funil?: string | null
          id?: string
          iniciado_em?: string
          lead_id?: string
          observacoes?: string | null
          produto?: string | null
          proxima_acao?: string | null
          status?: string
          valor_venda?: number | null
          vendedor_id?: string | null
          vendedor_nome?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "atendimentos_comerciais_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "atendimentos_comerciais_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "v_leads_crm"
            referencedColumns: ["id"]
          },
        ]
      }
      base_fria_leads: {
        Row: {
          email: string | null
          excluido: boolean
          id: string
          importado_em: string
          importado_para_leads: boolean
          lancamento: string
          nome: string | null
          sobrenome: string | null
          telefone: string | null
          ultimos_8: string | null
        }
        Insert: {
          email?: string | null
          excluido?: boolean
          id?: string
          importado_em?: string
          importado_para_leads?: boolean
          lancamento: string
          nome?: string | null
          sobrenome?: string | null
          telefone?: string | null
          ultimos_8?: string | null
        }
        Update: {
          email?: string | null
          excluido?: boolean
          id?: string
          importado_em?: string
          importado_para_leads?: boolean
          lancamento?: string
          nome?: string | null
          sobrenome?: string | null
          telefone?: string | null
          ultimos_8?: string | null
        }
        Relationships: []
      }
      blocklist_disparos: {
        Row: {
          criado_em: string | null
          email: string | null
          id: string
          motivo: string | null
          telefone: string | null
          ultimos_8: string | null
        }
        Insert: {
          criado_em?: string | null
          email?: string | null
          id?: string
          motivo?: string | null
          telefone?: string | null
          ultimos_8?: string | null
        }
        Update: {
          criado_em?: string | null
          email?: string | null
          id?: string
          motivo?: string | null
          telefone?: string | null
          ultimos_8?: string | null
        }
        Relationships: []
      }
      campanhas_disparo: {
        Row: {
          agendado_para: string | null
          atualizado_em: string
          concluido_em: string | null
          contexto_msg: string | null
          criado_em: string
          criado_por: string | null
          id: string
          iniciado_em: string | null
          lancamento_alvo: string
          nome: string
          status: string
          templates_selecionados: Json | null
          texto_1: string | null
          texto_2: string | null
          texto_3: string | null
          texto_4: string | null
          texto_5: string | null
          total_enviados: number | null
          total_erros: number | null
          total_leads: number | null
          total_responderam: number | null
        }
        Insert: {
          agendado_para?: string | null
          atualizado_em?: string
          concluido_em?: string | null
          contexto_msg?: string | null
          criado_em?: string
          criado_por?: string | null
          id?: string
          iniciado_em?: string | null
          lancamento_alvo: string
          nome: string
          status?: string
          templates_selecionados?: Json | null
          texto_1?: string | null
          texto_2?: string | null
          texto_3?: string | null
          texto_4?: string | null
          texto_5?: string | null
          total_enviados?: number | null
          total_erros?: number | null
          total_leads?: number | null
          total_responderam?: number | null
        }
        Update: {
          agendado_para?: string | null
          atualizado_em?: string
          concluido_em?: string | null
          contexto_msg?: string | null
          criado_em?: string
          criado_por?: string | null
          id?: string
          iniciado_em?: string | null
          lancamento_alvo?: string
          nome?: string
          status?: string
          templates_selecionados?: Json | null
          texto_1?: string | null
          texto_2?: string | null
          texto_3?: string | null
          texto_4?: string | null
          texto_5?: string | null
          total_enviados?: number | null
          total_erros?: number | null
          total_leads?: number | null
          total_responderam?: number | null
        }
        Relationships: []
      }
      catalogo_ofertas_henrique: {
        Row: {
          ativo: boolean | null
          bonus: Json | null
          created_at: string
          email_suporte: string | null
          ficha_aluno_link: string | null
          fim_publicacao: string | null
          grupo_whatsapp: string | null
          grupo_whatsapp_direto: string | null
          id: number
          idioma: string | null
          inicio_publicacao: string | null
          knowledge_payload: Json | null
          link_checkout: string | null
          link_evento_youtube: string | null
          link_ingressos: string | null
          link_pagina_vendas: string | null
          link_stripe: string | null
          link_whatsapp_suporte: string | null
          lista_tag: string | null
          mensagens_sequencia_onboarding: Json | null
          moeda: string | null
          nome_oferta: string | null
          observacoes_internas: string | null
          oferta_key: string | null
          permitir_duvidas_pre_evento: boolean | null
          permitir_venda_direta: boolean | null
          pesquisa_link: string | null
          playbook_resumo: string | null
          preco_texto: string | null
          produto_id_hotmart: string | null
          produto_principal: string | null
          redirect_contato_link: string | null
          redirect_youtube_link: string | null
          regiao: string | null
          tag_campanha: string | null
          template_mensagem_onboarding: string | null
          template_mensagem_pesquisa: string | null
          tipo_oferta: string | null
          tutorial_link: string | null
          updated_at: string
        }
        Insert: {
          ativo?: boolean | null
          bonus?: Json | null
          created_at?: string
          email_suporte?: string | null
          ficha_aluno_link?: string | null
          fim_publicacao?: string | null
          grupo_whatsapp?: string | null
          grupo_whatsapp_direto?: string | null
          id?: number
          idioma?: string | null
          inicio_publicacao?: string | null
          knowledge_payload?: Json | null
          link_checkout?: string | null
          link_evento_youtube?: string | null
          link_ingressos?: string | null
          link_pagina_vendas?: string | null
          link_stripe?: string | null
          link_whatsapp_suporte?: string | null
          lista_tag?: string | null
          mensagens_sequencia_onboarding?: Json | null
          moeda?: string | null
          nome_oferta?: string | null
          observacoes_internas?: string | null
          oferta_key?: string | null
          permitir_duvidas_pre_evento?: boolean | null
          permitir_venda_direta?: boolean | null
          pesquisa_link?: string | null
          playbook_resumo?: string | null
          preco_texto?: string | null
          produto_id_hotmart?: string | null
          produto_principal?: string | null
          redirect_contato_link?: string | null
          redirect_youtube_link?: string | null
          regiao?: string | null
          tag_campanha?: string | null
          template_mensagem_onboarding?: string | null
          template_mensagem_pesquisa?: string | null
          tipo_oferta?: string | null
          tutorial_link?: string | null
          updated_at?: string
        }
        Update: {
          ativo?: boolean | null
          bonus?: Json | null
          created_at?: string
          email_suporte?: string | null
          ficha_aluno_link?: string | null
          fim_publicacao?: string | null
          grupo_whatsapp?: string | null
          grupo_whatsapp_direto?: string | null
          id?: number
          idioma?: string | null
          inicio_publicacao?: string | null
          knowledge_payload?: Json | null
          link_checkout?: string | null
          link_evento_youtube?: string | null
          link_ingressos?: string | null
          link_pagina_vendas?: string | null
          link_stripe?: string | null
          link_whatsapp_suporte?: string | null
          lista_tag?: string | null
          mensagens_sequencia_onboarding?: Json | null
          moeda?: string | null
          nome_oferta?: string | null
          observacoes_internas?: string | null
          oferta_key?: string | null
          permitir_duvidas_pre_evento?: boolean | null
          permitir_venda_direta?: boolean | null
          pesquisa_link?: string | null
          playbook_resumo?: string | null
          preco_texto?: string | null
          produto_id_hotmart?: string | null
          produto_principal?: string | null
          redirect_contato_link?: string | null
          redirect_youtube_link?: string | null
          regiao?: string | null
          tag_campanha?: string | null
          template_mensagem_onboarding?: string | null
          template_mensagem_pesquisa?: string | null
          tipo_oferta?: string | null
          tutorial_link?: string | null
          updated_at?: string
        }
        Relationships: []
      }
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
            foreignKeyName: "compras_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "v_leads_crm"
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
      disparos_campanha: {
        Row: {
          campanha: string
          campanha_id: string | null
          contexto_disparo: string | null
          contexto_injetado: boolean | null
          convertido: boolean
          convertido_em: string | null
          convertido_por: string | null
          created_at: string
          encaminhado_em: string | null
          encaminhado_vendedora: boolean
          id: string
          lead_id: string | null
          lista: string
          nome_lead: string | null
          optout: boolean
          optout_em: string | null
          primeira_tentativa_em: string | null
          respondeu: boolean
          respondeu_em: string | null
          segunda_tentativa_em: string | null
          status: string
          telefone: string
          texto_enviado: string | null
          updated_at: string
        }
        Insert: {
          campanha: string
          campanha_id?: string | null
          contexto_disparo?: string | null
          contexto_injetado?: boolean | null
          convertido?: boolean
          convertido_em?: string | null
          convertido_por?: string | null
          created_at?: string
          encaminhado_em?: string | null
          encaminhado_vendedora?: boolean
          id?: string
          lead_id?: string | null
          lista: string
          nome_lead?: string | null
          optout?: boolean
          optout_em?: string | null
          primeira_tentativa_em?: string | null
          respondeu?: boolean
          respondeu_em?: string | null
          segunda_tentativa_em?: string | null
          status?: string
          telefone: string
          texto_enviado?: string | null
          updated_at?: string
        }
        Update: {
          campanha?: string
          campanha_id?: string | null
          contexto_disparo?: string | null
          contexto_injetado?: boolean | null
          convertido?: boolean
          convertido_em?: string | null
          convertido_por?: string | null
          created_at?: string
          encaminhado_em?: string | null
          encaminhado_vendedora?: boolean
          id?: string
          lead_id?: string | null
          lista?: string
          nome_lead?: string | null
          optout?: boolean
          optout_em?: string | null
          primeira_tentativa_em?: string | null
          respondeu?: boolean
          respondeu_em?: string | null
          segunda_tentativa_em?: string | null
          status?: string
          telefone?: string
          texto_enviado?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "disparos_campanha_campanha_id_fkey"
            columns: ["campanha_id"]
            isOneToOne: false
            referencedRelation: "campanhas_disparo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "disparos_campanha_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "disparos_campanha_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "v_leads_crm"
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
          entrou_grupo: boolean | null
          etapa_onboarding: string | null
          id: string
          lead_id: string
          lead_nome: string | null
          lead_telefone: string | null
          oferta_id: string
          onboarding_iniciado_em: string | null
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
          entrou_grupo?: boolean | null
          etapa_onboarding?: string | null
          id?: string
          lead_id: string
          lead_nome?: string | null
          lead_telefone?: string | null
          oferta_id: string
          onboarding_iniciado_em?: string | null
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
          entrou_grupo?: boolean | null
          etapa_onboarding?: string | null
          id?: string
          lead_id?: string
          lead_nome?: string | null
          lead_telefone?: string | null
          oferta_id?: string
          onboarding_iniciado_em?: string | null
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
            foreignKeyName: "entradas_funil_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "v_leads_crm"
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
            foreignKeyName: "followups_henrique_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "v_leads_crm"
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
          {
            foreignKeyName: "interacoes_lead_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "v_leads_crm"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          acao_sugerida: string | null
          atendimento_id: string | null
          atualizado_em: string
          cidade: string | null
          contexto_disparo: string | null
          criado_em: string
          data_primeira_entrada: string | null
          data_ultima_interacao: string | null
          em_atendimento_humano: boolean
          email: string | null
          estado: string | null
          flag_henrique_ativo: boolean
          funnel_stage: string
          icp_classification: string | null
          id: string
          idioma_preferencial: string | null
          indicacao_motivo: string | null
          interesse_duvida: string | null
          lifecycle_stage: string
          lista_origem: string | null
          main_desires: string | null
          main_objections: string | null
          main_pain_points: string | null
          motivo_perda: string | null
          nao_contatar: boolean
          nome_completo: string | null
          origem_principal: string | null
          pontuacao_mql: number
          primeiro_nome: string | null
          probabilidade_conversao: number | null
          produto_indicado: string | null
          resumo_perfil: string | null
          status_relacionamento: string | null
          telefone: string
          temperatura_lead: string | null
          ultimos_8: string | null
          user_profile: string | null
        }
        Insert: {
          acao_sugerida?: string | null
          atendimento_id?: string | null
          atualizado_em?: string
          cidade?: string | null
          contexto_disparo?: string | null
          criado_em?: string
          data_primeira_entrada?: string | null
          data_ultima_interacao?: string | null
          em_atendimento_humano?: boolean
          email?: string | null
          estado?: string | null
          flag_henrique_ativo?: boolean
          funnel_stage?: string
          icp_classification?: string | null
          id?: string
          idioma_preferencial?: string | null
          indicacao_motivo?: string | null
          interesse_duvida?: string | null
          lifecycle_stage?: string
          lista_origem?: string | null
          main_desires?: string | null
          main_objections?: string | null
          main_pain_points?: string | null
          motivo_perda?: string | null
          nao_contatar?: boolean
          nome_completo?: string | null
          origem_principal?: string | null
          pontuacao_mql?: number
          primeiro_nome?: string | null
          probabilidade_conversao?: number | null
          produto_indicado?: string | null
          resumo_perfil?: string | null
          status_relacionamento?: string | null
          telefone: string
          temperatura_lead?: string | null
          ultimos_8?: string | null
          user_profile?: string | null
        }
        Update: {
          acao_sugerida?: string | null
          atendimento_id?: string | null
          atualizado_em?: string
          cidade?: string | null
          contexto_disparo?: string | null
          criado_em?: string
          data_primeira_entrada?: string | null
          data_ultima_interacao?: string | null
          em_atendimento_humano?: boolean
          email?: string | null
          estado?: string | null
          flag_henrique_ativo?: boolean
          funnel_stage?: string
          icp_classification?: string | null
          id?: string
          idioma_preferencial?: string | null
          indicacao_motivo?: string | null
          interesse_duvida?: string | null
          lifecycle_stage?: string
          lista_origem?: string | null
          main_desires?: string | null
          main_objections?: string | null
          main_pain_points?: string | null
          motivo_perda?: string | null
          nao_contatar?: boolean
          nome_completo?: string | null
          origem_principal?: string | null
          pontuacao_mql?: number
          primeiro_nome?: string | null
          probabilidade_conversao?: number | null
          produto_indicado?: string | null
          resumo_perfil?: string | null
          status_relacionamento?: string | null
          telefone?: string
          temperatura_lead?: string | null
          ultimos_8?: string | null
          user_profile?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_atendimento_id_fkey"
            columns: ["atendimento_id"]
            isOneToOne: false
            referencedRelation: "atendimentos_comerciais"
            referencedColumns: ["id"]
          },
        ]
      }
      leads_LC_JAN26: {
        Row: {
          acao_sugerida: string | null
          ai_blocked: boolean | null
          ai_blocked_at: string | null
          ai_blocked_reason: string | null
          api_oficial: boolean
          area_atuacao: string | null
          conhecimento_previo_carbono: string | null
          conversion_probability: number | null
          created_at: string | null
          dor_principal: string | null
          email: string | null
          enquadramento_profissional: string | null
          estado: string | null
          evento_recuperacao: string | null
          faixa_etaria: string | null
          faixa_renda: string | null
          forma_pagamento: string | null
          funnel_stage: string | null
          human_agent_id: string | null
          human_agent_name: string | null
          icp_classification: string | null
          indicacao_motivo: string | null
          instancia: string | null
          interaction_score: number | null
          interesse_duvida: string | null
          last_8: string | null
          last_interaction_at: string | null
          lead_classification: string | null
          lead_profile_type: string | null
          lead_stage: string | null
          link_sent_at: string | null
          lost_at: string | null
          lost_reason: string | null
          lost_reason_detail: string | null
          main_desires: string | null
          main_objections: string | null
          main_pain_points: string | null
          pesquisa_respondida: boolean | null
          pesquisa_respondida_at: string | null
          produto_indicado: string | null
          proximo_followup: string | null
          purchase_value: number | null
          purchased_at: string | null
          recebeu_link: string | null
          regiao: string | null
          sexo: string | null
          stage_changed_at: string | null
          stage_changed_by: string | null
          status_compra: string | null
          tempo_conhece_sanquetta: string | null
          total_messages: number | null
          ultimo_followup: string | null
          updated_at: string | null
          user_name: string | null
          user_number: string
          user_profile: string | null
          viu_live: boolean | null
        }
        Insert: {
          acao_sugerida?: string | null
          ai_blocked?: boolean | null
          ai_blocked_at?: string | null
          ai_blocked_reason?: string | null
          api_oficial?: boolean
          area_atuacao?: string | null
          conhecimento_previo_carbono?: string | null
          conversion_probability?: number | null
          created_at?: string | null
          dor_principal?: string | null
          email?: string | null
          enquadramento_profissional?: string | null
          estado?: string | null
          evento_recuperacao?: string | null
          faixa_etaria?: string | null
          faixa_renda?: string | null
          forma_pagamento?: string | null
          funnel_stage?: string | null
          human_agent_id?: string | null
          human_agent_name?: string | null
          icp_classification?: string | null
          indicacao_motivo?: string | null
          instancia?: string | null
          interaction_score?: number | null
          interesse_duvida?: string | null
          last_8?: string | null
          last_interaction_at?: string | null
          lead_classification?: string | null
          lead_profile_type?: string | null
          lead_stage?: string | null
          link_sent_at?: string | null
          lost_at?: string | null
          lost_reason?: string | null
          lost_reason_detail?: string | null
          main_desires?: string | null
          main_objections?: string | null
          main_pain_points?: string | null
          pesquisa_respondida?: boolean | null
          pesquisa_respondida_at?: string | null
          produto_indicado?: string | null
          proximo_followup?: string | null
          purchase_value?: number | null
          purchased_at?: string | null
          recebeu_link?: string | null
          regiao?: string | null
          sexo?: string | null
          stage_changed_at?: string | null
          stage_changed_by?: string | null
          status_compra?: string | null
          tempo_conhece_sanquetta?: string | null
          total_messages?: number | null
          ultimo_followup?: string | null
          updated_at?: string | null
          user_name?: string | null
          user_number: string
          user_profile?: string | null
          viu_live?: boolean | null
        }
        Update: {
          acao_sugerida?: string | null
          ai_blocked?: boolean | null
          ai_blocked_at?: string | null
          ai_blocked_reason?: string | null
          api_oficial?: boolean
          area_atuacao?: string | null
          conhecimento_previo_carbono?: string | null
          conversion_probability?: number | null
          created_at?: string | null
          dor_principal?: string | null
          email?: string | null
          enquadramento_profissional?: string | null
          estado?: string | null
          evento_recuperacao?: string | null
          faixa_etaria?: string | null
          faixa_renda?: string | null
          forma_pagamento?: string | null
          funnel_stage?: string | null
          human_agent_id?: string | null
          human_agent_name?: string | null
          icp_classification?: string | null
          indicacao_motivo?: string | null
          instancia?: string | null
          interaction_score?: number | null
          interesse_duvida?: string | null
          last_8?: string | null
          last_interaction_at?: string | null
          lead_classification?: string | null
          lead_profile_type?: string | null
          lead_stage?: string | null
          link_sent_at?: string | null
          lost_at?: string | null
          lost_reason?: string | null
          lost_reason_detail?: string | null
          main_desires?: string | null
          main_objections?: string | null
          main_pain_points?: string | null
          pesquisa_respondida?: boolean | null
          pesquisa_respondida_at?: string | null
          produto_indicado?: string | null
          proximo_followup?: string | null
          purchase_value?: number | null
          purchased_at?: string | null
          recebeu_link?: string | null
          regiao?: string | null
          sexo?: string | null
          stage_changed_at?: string | null
          stage_changed_by?: string | null
          status_compra?: string | null
          tempo_conhece_sanquetta?: string | null
          total_messages?: number | null
          ultimo_followup?: string | null
          updated_at?: string | null
          user_name?: string | null
          user_number?: string
          user_profile?: string | null
          viu_live?: boolean | null
        }
        Relationships: []
      }
      logs_decisoes_henrique: {
        Row: {
          created_at: string
          ferramenta: string | null
          id: number
          input_enviado: string | null
          output_recebido: Json | null
          session_id: string | null
        }
        Insert: {
          created_at?: string
          ferramenta?: string | null
          id?: number
          input_enviado?: string | null
          output_recebido?: Json | null
          session_id?: string | null
        }
        Update: {
          created_at?: string
          ferramenta?: string | null
          id?: number
          input_enviado?: string | null
          output_recebido?: Json | null
          session_id?: string | null
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
      n8n_chat_api_oficial: {
        Row: {
          id: number
          message: Json
          session_id: string
          updated_at: string | null
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
          updated_at?: string | null
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      n8n_chat_unificado: {
        Row: {
          id: number
          message: Json
          session_id: string
          updated_at: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
          updated_at?: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
          updated_at?: string
        }
        Relationships: []
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
      onboarding_rascunhos: {
        Row: {
          criado_em: string
          email: string
          id: string
          ref_tentado: string | null
          respostas: Json
          status: string
          telefone: string | null
        }
        Insert: {
          criado_em?: string
          email: string
          id?: string
          ref_tentado?: string | null
          respostas: Json
          status?: string
          telefone?: string | null
        }
        Update: {
          criado_em?: string
          email?: string
          id?: string
          ref_tentado?: string | null
          respostas?: Json
          status?: string
          telefone?: string | null
        }
        Relationships: []
      }
      onboarding_tokens: {
        Row: {
          criado_em: string
          entrada_funil_id: string | null
          expira_em: string
          id: string
          lead_id: string
          oferta_id: string | null
          token: string
          usado_em: string | null
        }
        Insert: {
          criado_em?: string
          entrada_funil_id?: string | null
          expira_em?: string
          id?: string
          lead_id: string
          oferta_id?: string | null
          token: string
          usado_em?: string | null
        }
        Update: {
          criado_em?: string
          entrada_funil_id?: string | null
          expira_em?: string
          id?: string
          lead_id?: string
          oferta_id?: string | null
          token?: string
          usado_em?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_tokens_entrada_funil_id_fkey"
            columns: ["entrada_funil_id"]
            isOneToOne: false
            referencedRelation: "entradas_funil"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "onboarding_tokens_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "onboarding_tokens_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "v_leads_crm"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "onboarding_tokens_oferta_id_fkey"
            columns: ["oferta_id"]
            isOneToOne: false
            referencedRelation: "ofertas"
            referencedColumns: ["id"]
          },
        ]
      }
      registro_suporte: {
        Row: {
          created_at: string
          id: number
          motivo: string | null
          nome: string | null
          telefone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          motivo?: string | null
          nome?: string | null
          telefone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          motivo?: string | null
          nome?: string | null
          telefone?: string | null
          updated_at?: string | null
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
          {
            foreignKeyName: "respostas_onboarding_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "v_leads_crm"
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
          {
            foreignKeyName: "sugestoes_followup_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "v_leads_crm"
            referencedColumns: ["id"]
          },
        ]
      }
      templates_whatsapp: {
        Row: {
          ativo: boolean | null
          atualizado_em: string | null
          categoria: string | null
          corpo_preview: string | null
          criado_em: string | null
          descricao: string | null
          id: string
          idioma: string | null
          nome_template: string
          variaveis: Json | null
        }
        Insert: {
          ativo?: boolean | null
          atualizado_em?: string | null
          categoria?: string | null
          corpo_preview?: string | null
          criado_em?: string | null
          descricao?: string | null
          id?: string
          idioma?: string | null
          nome_template: string
          variaveis?: Json | null
        }
        Update: {
          ativo?: boolean | null
          atualizado_em?: string | null
          categoria?: string | null
          corpo_preview?: string | null
          criado_em?: string | null
          descricao?: string | null
          id?: string
          idioma?: string | null
          nome_template?: string
          variaveis?: Json | null
        }
        Relationships: []
      }
    }
    Views: {
      v_leads_crm: {
        Row: {
          acao_sugerida: string | null
          compras: Json | null
          data_primeira_entrada: string | null
          data_ultima_interacao: string | null
          entradas_funil: Json | null
          id: string | null
          interesse_duvida: string | null
          main_desires: string | null
          main_objections: string | null
          main_pain_points: string | null
          nome_completo: string | null
          pontuacao_mql: number | null
          telefone: string | null
          temperatura_lead: string | null
          user_profile: string | null
        }
        Relationships: []
      }
      vw_onboarding_respostas_amigavel: {
        Row: {
          area_atuacao: string | null
          campanha: string | null
          conhecimento_previo_carbono: string | null
          data_entrada: string | null
          dor_principal: string | null
          email: string | null
          enquadramento_profissional: string | null
          entrada_funil_id: string | null
          estado: string | null
          faixa_etaria: string | null
          faixa_renda: string | null
          lancamento: string | null
          lead_id: string | null
          nome: string | null
          respondido_em: string | null
          sexo: string | null
          telefone: string | null
          tempo_conhece_sanquetta: string | null
        }
        Relationships: [
          {
            foreignKeyName: "respostas_onboarding_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "respostas_onboarding_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "v_leads_crm"
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
