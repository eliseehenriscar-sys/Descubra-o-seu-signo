#!/usr/bin/env python3
"""
Descubra o Seu Signo - Servidor + SQLite
"""
import http.server
import socketserver
import os
import sys
import json
import sqlite3
import socket
from urllib.parse import urlparse, parse_qs
from datetime import datetime

PORT_INICIAL = 8000
DB_NAME = "signos.db"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(BASE_DIR)
DB_PATH = os.path.join(BASE_DIR, DB_NAME)


def porta_livre(inicio=8000, tentativas=20):
    for porta in range(inicio, inicio + tentativas):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(("", porta))
                return porta
            except OSError:
                continue
    return None


def criar_banco():
    print(f"[DB] Caminho do banco: {DB_PATH}")
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    cur.execute("""
        CREATE TABLE IF NOT EXISTS signos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            chave TEXT UNIQUE NOT NULL,
            nome TEXT NOT NULL,
            simbolo TEXT NOT NULL,
            periodo TEXT NOT NULL,
            elemento TEXT NOT NULL,
            planeta TEXT NOT NULL,
            cor TEXT NOT NULL,
            numeros TEXT NOT NULL,
            descricao TEXT NOT NULL,
            amor TEXT NOT NULL,
            fortes TEXT NOT NULL,
            compat TEXT NOT NULL
        )
    """)

    cur.execute("SELECT COUNT(*) FROM signos")
    count = cur.fetchone()[0]

    if count == 0:
        dados = [
            ("aries", "Áries", "♈", "21 de março a 20 de abril", "Fogo", "Marte",
             "Vermelho", "1, 9, 17",
             "Áries é o primeiro signo do zodíaco. Pessoas de Áries são impulsivas, corajosas, energéticas e líderes natas. Gostam de desafios, agem rápido e possuem grande iniciativa. Podem ser impacientes e um pouco competitivas.",
             "No amor são apaixonadas, diretas e gostam de conquistar. Precisam de liberdade e de um parceiro que acompanhe seu ritmo dinâmico.",
             "Coragem, liderança, otimismo, determinação e honestidade.",
             "Melhor compatibilidade com Leão, Sagitário e Gêmeos. Boa também com Aquário e Libra."),
            ("touro", "Touro", "♉", "21 de abril a 20 de maio", "Terra", "Vênus",
             "Verde / Rosa", "2, 6, 15",
             "Touro valoriza estabilidade, conforto e prazeres sensoriais. São pessoas práticas, pacientes, leais e com forte senso de segurança material e emocional. Podem ser teimosas quando decidem algo.",
             "São carinhosos, sensuais e buscam relacionamentos duradouros. Demonstram amor através de gestos concretos e fidelidade.",
             "Paciência, lealdade, praticidade, perseverança e bom gosto.",
             "Melhor compatibilidade com Virgem, Capricórnio e Câncer. Boa também com Peixes e Escorpião."),
            ("gemeos", "Gêmeos", "♊", "21 de maio a 20 de junho", "Ar", "Mercúrio",
             "Amarelo", "3, 5, 14",
             "Gêmeos é o signo da comunicação e da versatilidade. São curiosos, inteligentes, sociáveis e adoram trocar ideias. Possuem mente ágil e se adaptam facilmente a novas situações. Podem parecer inquietos ou inconstantes.",
             "Gostam de conversas estimulantes e de variedade. Precisam de um parceiro intelectualmente compatível e que respeite sua necessidade de movimento.",
             "Comunicação, inteligência, adaptabilidade, humor e versatilidade.",
             "Melhor compatibilidade com Libra, Aquário e Áries. Boa também com Leão e Sagitário."),
            ("cancer", "Câncer", "♋", "21 de junho a 22 de julho", "Água", "Lua",
             "Prata / Branco", "2, 7, 11",
             "Câncer é profundamente emocional e ligado à família e ao lar. São protetores, intuitivos, sensíveis e carinhosos. Valorizam a segurança emocional e podem ser um pouco possessivos ou humoráveis.",
             "São românticos, cuidadosos e buscam conexões profundas. Demonstram amor cuidando do outro e criando um ambiente acolhedor.",
             "Empatia, intuição, lealdade, proteção e capacidade de cuidar.",
             "Melhor compatibilidade com Escorpião, Peixes e Touro. Boa também com Virgem e Capricórnio."),
            ("leao", "Leão", "♌", "23 de julho a 22 de agosto", "Fogo", "Sol",
             "Dourado / Laranja", "1, 4, 10",
             "Leão é confiante, generoso, criativo e gosta de ser o centro das atenções. Possuem carisma natural, orgulho saudável e grande generosidade. Podem ser dramáticos e orgulhosos demais em alguns momentos.",
             "São apaixonados, leais e gostam de elogiar e ser elogiados. Buscam um relacionamento que os faça se sentir especiais e admirados.",
             "Confiança, generosidade, criatividade, lealdade e magnetismo.",
             "Melhor compatibilidade com Áries, Sagitário e Libra. Boa também com Gêmeos e Aquário."),
            ("virgem", "Virgem", "♍", "23 de agosto a 22 de setembro", "Terra", "Mercúrio",
             "Bege / Verde claro", "5, 14, 23",
             "Virgem é analítico, organizado, perfeccionista e prestativo. Prestam atenção aos detalhes e buscam utilidade e eficiência em tudo. Podem ser críticos consigo mesmos e com os outros.",
             "Demonstram amor através de gestos práticos e cuidados diários. Valorizam estabilidade e honestidade no relacionamento.",
             "Organização, inteligência prática, dedicação, discrição e utilidade.",
             "Melhor compatibilidade com Touro, Capricórnio e Câncer. Boa também com Escorpião e Peixes."),
            ("libra", "Libra", "♎", "23 de setembro a 22 de outubro", "Ar", "Vênus",
             "Rosa / Azul claro", "6, 15, 24",
             "Libra busca harmonia, justiça e beleza. São diplomáticos, sociáveis, elegantes e com forte senso de equidade. Podem ter dificuldade em tomar decisões por quererem agradar a todos.",
             "São românticos, parceiros e valorizam o equilíbrio no casal. Gostam de relacionamentos harmoniosos e estéticamente agradáveis.",
             "Diplomacia, senso de justiça, charme, sociabilidade e equilíbrio.",
             "Melhor compatibilidade com Gêmeos, Aquário e Leão. Boa também com Áries e Sagitário."),
            ("escorpiao", "Escorpião", "♏", "23 de outubro a 21 de novembro", "Água", "Plutão / Marte",
             "Preto / Bordô", "8, 11, 18",
             "Escorpião é intenso, apaixonado, misterioso e profundamente leal. Possuem grande força de vontade, intuição e capacidade de transformação. Podem ser possessivos e guardam rancores.",
             "Amam com intensidade total. Buscam conexão profunda e verdade. Não aceitam superficialidade nos relacionamentos.",
             "Intensidade, lealdade, determinação, intuição e resiliência.",
             "Melhor compatibilidade com Câncer, Peixes e Virgem. Boa também com Touro e Capricórnio."),
            ("sagitario", "Sagitário", "♐", "22 de novembro a 21 de dezembro", "Fogo", "Júpiter",
             "Roxo / Azul", "3, 9, 12",
             "Sagitário é aventureiro, otimista, filosófico e livre. Adoram viajar, aprender e expandir horizontes. São honestos (às vezes demais) e possuem grande senso de humor. Podem ser irresponsáveis ou excessivamente diretos.",
             "Precisam de liberdade e de um parceiro que compartilhe a sede de aventura e conhecimento. São leais quando encontram alguém especial.",
             "Otimismo, honestidade, entusiasmo, visão ampla e generosidade.",
             "Melhor compatibilidade com Áries, Leão e Aquário. Boa também com Gêmeos e Libra."),
            ("capricornio", "Capricórnio", "♑", "22 de dezembro a 19 de janeiro", "Terra", "Saturno",
             "Marrom / Preto", "4, 8, 13",
             "Capricórnio é ambicioso, responsável, disciplinado e pragmático. Valorizam o trabalho duro, o status e a construção de uma base sólida. Podem parecer frios ou excessivamente sérios.",
             "São leais e comprometidos a longo prazo. Demonstram amor através de estabilidade, proteção e conquistas compartilhadas.",
             "Disciplina, ambição, responsabilidade, paciência e perseverança.",
             "Melhor compatibilidade com Touro, Virgem e Peixes. Boa também com Escorpião e Câncer."),
            ("aquario", "Aquário", "♒", "20 de janeiro a 18 de fevereiro", "Ar", "Urano / Saturno",
             "Azul elétrico", "4, 7, 11",
             "Aquário é inovador, independente, humanitário e original. Pensam no coletivo e valorizam a liberdade individual. São visionários e podem parecer distantes emocionalmente ou excêntricos.",
             "Precisam de liberdade e de um relacionamento baseado em amizade e respeito mútuo. Valorizam a individualidade do parceiro.",
             "Originalidade, humanitarismo, inteligência, independência e visão de futuro.",
             "Melhor compatibilidade com Gêmeos, Libra e Sagitário. Boa também com Áries e Leão."),
            ("peixes", "Peixes", "♓", "19 de fevereiro a 20 de março", "Água", "Netuno / Júpiter",
             "Lilás / Verde água", "3, 7, 12",
             "Peixes é sonhador, compassivo, artístico e extremamente sensível. Possuem grande empatia e imaginação. Podem se perder em fantasias ou ser excessivamente escapistas.",
             "São românticos, intuitivos e se doam completamente. Buscam uma conexão espiritual e emocional profunda.",
             "Empatia, criatividade, intuição, compaixão e adaptabilidade.",
             "Melhor compatibilidade com Câncer, Escorpião e Capricórnio. Boa também com Touro e Virgem."),
        ]
        cur.executemany("""
            INSERT INTO signos
            (chave, nome, simbolo, periodo, elemento, planeta, cor, numeros, descricao, amor, fortes, compat)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, dados)
        conn.commit()
        print(f"[DB] Banco CRIADO e populado com {len(dados)} signos.")
    else:
        print(f"[DB] Banco OK — {count} signos encontrados.")

    conn.close()
    return True


def descobrir_chave(mes, dia):
    if (mes == 3 and dia >= 21) or (mes == 4 and dia <= 20): return "aries"
    if (mes == 4 and dia >= 21) or (mes == 5 and dia <= 20): return "touro"
    if (mes == 5 and dia >= 21) or (mes == 6 and dia <= 20): return "gemeos"
    if (mes == 6 and dia >= 21) or (mes == 7 and dia <= 22): return "cancer"
    if (mes == 7 and dia >= 23) or (mes == 8 and dia <= 22): return "leao"
    if (mes == 8 and dia >= 23) or (mes == 9 and dia <= 22): return "virgem"
    if (mes == 9 and dia >= 23) or (mes == 10 and dia <= 22): return "libra"
    if (mes == 10 and dia >= 23) or (mes == 11 and dia <= 21): return "escorpiao"
    if (mes == 11 and dia >= 22) or (mes == 12 and dia <= 21): return "sagitario"
    if (mes == 12 and dia >= 22) or (mes == 1 and dia <= 19): return "capricornio"
    if (mes == 1 and dia >= 20) or (mes == 2 and dia <= 18): return "aquario"
    if (mes == 2 and dia >= 19) or (mes == 3 and dia <= 20): return "peixes"
    return "aries"


def buscar_signo_por_chave(chave):
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM signos WHERE chave = ?", (chave,))
        row = cur.fetchone()
        conn.close()
        if row is None:
            return None
        return dict(row)
    except Exception as e:
        print(f"[DB ERRO] {e}")
        return None


def status_banco():
    try:
        conn = sqlite3.connect(DB_PATH)
        cur = conn.cursor()
        cur.execute("SELECT COUNT(*) FROM signos")
        total = cur.fetchone()[0]
        cur.execute("SELECT chave, nome FROM signos ORDER BY id")
        lista = [{"chave": r[0], "nome": r[1]} for r in cur.fetchall()]
        conn.close()
        return {"ok": True, "caminho": DB_PATH, "total": total, "signos": lista}
    except Exception as e:
        return {"ok": False, "erro": str(e), "caminho": DB_PATH}


class MyHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

    def log_message(self, format, *args):
        print(f"[{self.log_date_time_string()}] {args[0]}")

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == "/api/status":
            self._json_response(status_banco())
            return

        if path == "/api/signo":
            qs = parse_qs(parsed.query)
            data_str = qs.get("data", [None])[0]

            if not data_str:
                self._json_response({"erro": "Falta o parâmetro data (YYYY-MM-DD)."}, 400)
                return

            try:
                dt = datetime.strptime(data_str, "%Y-%m-%d")
                mes, dia = dt.month, dt.day
            except ValueError:
                self._json_response({"erro": "Data inválida. Use YYYY-MM-DD."}, 400)
                return

            chave = descobrir_chave(mes, dia)
            print(f"[API] data={data_str} → chave={chave}")
            signo = buscar_signo_por_chave(chave)

            if signo is None:
                self._json_response({
                    "erro": "Signo não encontrado no banco.",
                    "chave_buscada": chave,
                    "db_path": DB_PATH
                }, 404)
                return

            resposta = {
                "chave": signo["chave"],
                "nome": signo["nome"],
                "simbolo": signo["simbolo"],
                "periodo": signo["periodo"],
                "elemento": signo["elemento"],
                "planeta": signo["planeta"],
                "cor": signo["cor"],
                "numeros": signo["numeros"],
                "descricao": signo["descricao"],
                "amor": signo["amor"],
                "fortes": signo["fortes"],
                "compat": signo["compat"],
            }
            self._json_response(resposta)
            return

        if path == "/" or path == "/index.html":
            self.path = "/index.html"
            return super().do_GET()

        return super().do_GET()

    def _json_response(self, data, status=200):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


if __name__ == "__main__":
    print("=" * 55)
    print("  Iniciando Descubra o Seu Signo")
    print("=" * 55)
    print(f"  Pasta do projeto: {BASE_DIR}")

    criar_banco()

    st = status_banco()
    if not st["ok"]:
        print(f"[ERRO] Banco com problema: {st.get('erro')}")
        sys.exit(1)
    print(f"[DB] Teste OK — {st['total']} signos no banco.")

    porta = porta_livre(PORT_INICIAL)
    if porta is None:
        print("Erro: Nenhuma porta livre (8000-8019).")
        print("Execute: fuser -k 8000/tcp")
        sys.exit(1)

    if porta != PORT_INICIAL:
        print(f"[AVISO] Porta {PORT_INICIAL} ocupada → usando {porta}")

    try:
        socketserver.TCPServer.allow_reuse_address = True
        with socketserver.TCPServer(("", porta), MyHandler) as httpd:
            print("=" * 55)
            print(f"  Acesse no navegador:")
            print(f"  →  http://127.0.0.1:{porta}")
            print(f"  Teste do banco:")
            print(f"  →  http://127.0.0.1:{porta}/api/status")
            print(f"  Teste de um signo:")
            print(f"  →  http://127.0.0.1:{porta}/api/signo?data=1995-07-25")
            print("  Pressione Ctrl+C para parar")
            print("=" * 55)
            httpd.serve_forever()
    except OSError as e:
        print(f"Erro ao iniciar: {e}")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\nServidor encerrado.")
