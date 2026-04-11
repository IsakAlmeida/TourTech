package school.sptech;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import school.sptech.model.EstabelecimentoAlimenticio;
import school.sptech.model.Hospedagem;
import school.sptech.model.Log;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class LeitorExcel {

    private List<Log> logs = new ArrayList<>();

    //HOSPEDAGEM
    public List<Hospedagem> extrairHospedagens(String nomeArquivo) {
        List<Hospedagem> lista = new ArrayList<>();

        try (
                InputStream arquivo = new FileInputStream(nomeArquivo);
                Workbook workbook = new XSSFWorkbook(arquivo)
        ) {

            logs.add(new Log("INICIO LEITURA EXCEL HOSPEDAGEM", "INFO", "ARQUIVO"));

            Sheet sheet = workbook.getSheetAt(0);

            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue;

                String nome = row.getCell(2).getStringCellValue();
                String categoria = row.getCell(16).getStringCellValue();
                String endereco = row.getCell(6).getStringCellValue();
                String multilingue = row.getCell(15).getStringCellValue();
                String municipio = row.getCell(8).getStringCellValue();
                String contato = row.getCell(10).getStringCellValue();
                String email = row.getCell(11).getStringCellValue();

                boolean multi = false;
                if (multilingue != null && !multilingue.isBlank()) {
                    multi = multilingue.contains("|");
                }

                lista.add(new Hospedagem(nome, categoria, endereco, multi, municipio, contato, email));
            }

            logs.add(new Log("LEITURA HOSPEDAGEM FINALIZADA", "SUCESSO", "ARQUIVO"));

        } catch (Exception e) {
            logs.add(new Log("ERRO LEITURA EXCEL HOSPEDAGEM", "ERRO", "ARQUIVO"));
            System.out.println(e.getMessage());
        }

        return lista;
    }

    public List<EstabelecimentoAlimenticio> extrairEstabelecimentos(String nomeArquivo) {
        List<EstabelecimentoAlimenticio> lista = new ArrayList<>();

        try (
                InputStream arquivo = new FileInputStream(nomeArquivo);
                Workbook workbook = new XSSFWorkbook(arquivo)
        ) {

            logs.add(new Log("INICIO LEITURA EXCEL ESTABELECIMENTO", "INFO", "ARQUIVO"));

            Sheet sheet = workbook.getSheetAt(0);

            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue;

                String nome = row.getCell(2).getStringCellValue();
                String categoria = row.getCell(16).getStringCellValue();
                String endereco = row.getCell(6).getStringCellValue();
                String multilingue = row.getCell(15).getStringCellValue();
                String municipio = row.getCell(8).getStringCellValue();
                String contato = row.getCell(10).getStringCellValue();
                String email = row.getCell(11).getStringCellValue();

                boolean multi = false;
                if (multilingue != null && !multilingue.isBlank()) {
                    multi = multilingue.contains("|");
                }

                lista.add(new EstabelecimentoAlimenticio(nome, categoria, endereco, multi, municipio, contato, email));
            }

            logs.add(new Log("LEITURA ESTABELECIMENTO FINALIZADA", "SUCESSO", "ARQUIVO"));

        } catch (Exception e) {
            logs.add(new Log("ERRO LEITURA EXCEL ESTABELECIMENTO", "ERRO", "ARQUIVO"));
            System.out.println(e.getMessage());
        }

        return lista;
    }

    public List<Log> getLogs() {
        return logs;
    }
}