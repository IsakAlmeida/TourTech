package school.sptech;

import org.apache.commons.logging.LogFactory;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import school.sptech.model.*;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class LeitorExcel {
    private final S3Client s3 = S3Client.builder()
            .region(Region.US_EAST_1)
            .build();

    private List<Log> logs = new ArrayList<>();

    //PAÍSES
    public List<Pais> extrairPaises(String nomeArquivo, String nomeBucket) {
        List<Pais> lista = new ArrayList<>();

        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(nomeBucket)
                .key(nomeArquivo)
                .build();

        try (
                ResponseInputStream<GetObjectResponse> s3Stream = s3.getObject(getObjectRequest);
                Workbook workbook = new XSSFWorkbook(s3Stream)
        ) {

            logs.add(new Log("INICIO LEITURA EXCEL PAISES", "INFO", "ARQUIVO"));

            Sheet sheet = workbook.getSheetAt(0);

            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue;

                String nome = row.getCell(1).getStringCellValue();

                lista.add(new Pais(nome));
            }

            logs.add(new Log("LEITURA PAISES FINALIZADA", "SUCESSO", "ARQUIVO"));

        } catch (Exception e) {
            logs.add(new Log("ERRO LEITURA EXCEL PAISES", "ERRO", "ARQUIVO"));
            System.out.println(e.getMessage());
        }

        return lista;
    }

    //HOSPEDAGEM
    public List<Hospedagem> extrairHospedagens(String nomeArquivo, String nomeBucket) {
        List<Hospedagem> lista = new ArrayList<>();

        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(nomeBucket)
                .key(nomeArquivo)
                .build();

        try (
                ResponseInputStream<GetObjectResponse> s3Stream = s3.getObject(getObjectRequest);
                Workbook workbook = new XSSFWorkbook(s3Stream)
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

    public List<EstabelecimentoAlimenticio> extrairEstabelecimentos(String nomeArquivo, String nomeBucket) {
        List<EstabelecimentoAlimenticio> lista = new ArrayList<>();

        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(nomeBucket)
                .key(nomeArquivo)
                .build();

        try (
                ResponseInputStream<GetObjectResponse> s3Stream = s3.getObject(getObjectRequest);
                Workbook workbook = new XSSFWorkbook(s3Stream)
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

    //ATRATIVOS
    public List<Atrativos> extrairAtrativos(String nomeArquivo, String nomeBucket) {
        List<Atrativos> lista = new ArrayList<>();

        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(nomeBucket)
                .key(nomeArquivo)
                .build();

        try (
                ResponseInputStream<GetObjectResponse> s3Stream = s3.getObject(getObjectRequest);
                Workbook workbook = new XSSFWorkbook(s3Stream)
        ) {

            logs.add(new Log("INICIO LEITURA EXCEL ATRATIVOS", "INFO", "ARQUIVO"));

            Sheet sheet = workbook.getSheetAt(0);

            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue;

                String nome = row.getCell(1).getStringCellValue();
                String categoria = row.getCell(2).getStringCellValue();
                String municipio = row.getCell(3).getStringCellValue();

                lista.add(new Atrativos(nome, categoria, municipio));
            }

            logs.add(new Log("LEITURA ATRATIVOS FINALIZADA", "SUCESSO", "ARQUIVO"));

        } catch (Exception e) {
            logs.add(new Log("ERRO LEITURA EXCEL ATRATIVOS", "ERRO", "ARQUIVO"));
            System.out.println(e.getMessage());
        }

        return lista;
    }

    //TURISMO NACIONAL POR ATRATIVOS
    public List<TurismoNacionalAtrativo> extrairTurismoNacionalAtrativo(String nomeArquivo, String nomeBucket) {
        List<TurismoNacionalAtrativo> lista = new ArrayList<>();

        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(nomeBucket)
                .key(nomeArquivo)
                .build();

        try (
                ResponseInputStream<GetObjectResponse> s3Stream = s3.getObject(getObjectRequest);
                Workbook workbook = new XSSFWorkbook(s3Stream)
        ) {

            logs.add(new Log("INICIO LEITURA EXCEL TURISMO NACIONAL POR ATRATIVOS", "INFO", "ARQUIVO"));

            Sheet sheet = workbook.getSheetAt(2);

            Row header = sheet.getRow(0);

            for (Row row : sheet) {

                // pula o header
                if (row.getRowNum() == 0) continue;

                try {
                    String atrativo = row.getCell(1).getStringCellValue();
                    Integer ano = 2024;

                    // percorre os meses
                    for (int i = 2; i <= 13; i++) {
                        Cell cellQuantidade = row.getCell(i);
                        if (cellQuantidade == null) continue;

                        Integer quantidade = (int) cellQuantidade.getNumericCellValue();
                        String mes = header.getCell(i).getStringCellValue(); // pega o mês direto do header

                        TurismoNacionalAtrativo turismo = new TurismoNacionalAtrativo(quantidade, mes, ano, atrativo);

                        lista.add(turismo);
                    }

                } catch (Exception e) {
                    System.out.println("ERRO NA LINHA " + row.getRowNum() + ": " + e.getMessage());
                }
            }

            logs.add(new Log("LEITURA TURISMO NACIONAL POR ATRATIVOS FINALIZADA", "SUCESSO", "ARQUIVO"));

        } catch (Exception e) {
            logs.add(new Log("ERRO LEITURA EXCEL TURISMO NACIONAL POR ATRATIVOS", "ERRO", "ARQUIVO"));
            System.out.println(e.getMessage());
        }

        return lista;
    }

    //TURISMO INTERNACIONAL POR ATRATIVOS
    public List<TurismoInternacionalAtrativo> extrairTurismoInternacionalAtrativo(String nomeArquivo, String nomeBucket) {
        List<TurismoInternacionalAtrativo> lista = new ArrayList<>();

        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(nomeBucket)
                .key(nomeArquivo)
                .build();

        try (
                ResponseInputStream<GetObjectResponse> s3Stream = s3.getObject(getObjectRequest);
                Workbook workbook = new XSSFWorkbook(s3Stream)
        ) {

            logs.add(new Log("INICIO LEITURA EXCEL TURISMO INTERNACIONAL POR ATRATIVOS", "INFO", "ARQUIVO"));

            Sheet sheet = workbook.getSheetAt(1);

            Row header = sheet.getRow(0);

            for (Row row : sheet) {

                // pula o header
                if (row.getRowNum() == 0) continue;

                try {
                    String atrativo = row.getCell(1).getStringCellValue();
                    Integer ano = 2024;

                    // percorre os meses
                    for (int i = 2; i <= 13; i++) {
                        Cell cellQuantidade = row.getCell(i);
                        if (cellQuantidade == null) continue;

                        Integer quantidade = (int) cellQuantidade.getNumericCellValue();
                        String mes = header.getCell(i).getStringCellValue(); // pega o mês direto do header

                        TurismoInternacionalAtrativo turismo = new TurismoInternacionalAtrativo(quantidade, mes, ano, atrativo);

                        lista.add(turismo);
                    }

                } catch (Exception e) {
                    System.out.println("ERRO NA LINHA " + row.getRowNum() + ": " + e.getMessage());
                }
            }

            logs.add(new Log("LEITURA TURISMO INTERNACIONAL POR ATRATIVOS FINALIZADA", "SUCESSO", "ARQUIVO"));

        } catch (Exception e) {
            logs.add(new Log("ERRO LEITURA EXCEL TURISMO INTERNACIONAL POR ATRATIVOS", "ERRO", "ARQUIVO"));
            System.out.println(e.getMessage());
        }

        return lista;
    }

    public List<TurismoNacionalEstado> extrairTurismoNacionalEstado(String nomeArquivo, String nomeBucket) {
        List<TurismoNacionalEstado> lista = new ArrayList<>();

        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(nomeBucket)
                .key(nomeArquivo)
                .build();

        try (
                ResponseInputStream<GetObjectResponse> s3Stream = s3.getObject(getObjectRequest);
                Workbook workbook = new XSSFWorkbook(s3Stream)
        ) {

            logs.add(new Log("INICIO LEITURA EXCEL TURISMO NACIONAL POR ESTADO", "INFO", "ARQUIVO"));

            Sheet sheet = workbook.getSheetAt(1);

            Row header = sheet.getRow(0);

            for (Row row : sheet) {

                // pula o header
                if (row.getRowNum() == 0) continue;

                try {
                    String estado = row.getCell(1).getStringCellValue();
                    Integer ano = 2024;

                    // percorre os meses
                    for (int i = 2; i <= 13; i++) {
                        Cell cellQuantidade = row.getCell(i);
                        if (cellQuantidade == null) continue;

                        Integer quantidade = (int) cellQuantidade.getNumericCellValue();
                        String mes = header.getCell(i).getStringCellValue(); // pega o mês direto do header

                        TurismoNacionalEstado turismo = new TurismoNacionalEstado(quantidade, mes, ano, estado);

                        lista.add(turismo);
                    }

                } catch (Exception e) {
                    System.out.println("ERRO NA LINHA " + row.getRowNum() + ": " + e.getMessage());
                }
            }

            logs.add(new Log("LEITURA TURISMO NACIONAL POR ESTADO FINALIZADA", "SUCESSO", "ARQUIVO"));

        } catch (Exception e) {
            logs.add(new Log("ERRO LEITURA EXCEL TURISMO NACIONAL POR ESTADO", "ERRO", "ARQUIVO"));
            System.out.println(e.getMessage());
        }

        return lista;
    }

    public List<TurismoInternacionalPais> extrairTurismoInternacionalPais(String nomeArquivo, String nomeBucket) {
        List<TurismoInternacionalPais> lista = new ArrayList<>();

        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(nomeBucket)
                .key(nomeArquivo)
                .build();

        try (
                ResponseInputStream<GetObjectResponse> s3Stream = s3.getObject(getObjectRequest);
                Workbook workbook = new XSSFWorkbook(s3Stream)
        ) {

            logs.add(new Log("INICIO LEITURA EXCEL TURISMO INTERNACIONAL POR PAIS", "INFO", "ARQUIVO"));

            Sheet sheet = workbook.getSheetAt(0);

            Row header = sheet.getRow(0);

            for (Row row : sheet) {

                // pula o header
                if (row.getRowNum() == 0) continue;

                try {
                    String pais = row.getCell(1).getStringCellValue();
                    Integer ano = 2024;

                    // percorre os meses
                    for (int i = 2; i <= 13; i++) {
                        Cell cellQuantidade = row.getCell(i);
                        if (cellQuantidade == null) continue;

                        Integer quantidade = (int) cellQuantidade.getNumericCellValue();
                        String mes = header.getCell(i).getStringCellValue(); // pega o mês direto do header

                        TurismoInternacionalPais turismo = new TurismoInternacionalPais(quantidade, mes, ano, pais);

                        lista.add(turismo);
                    }

                } catch (Exception e) {
                    System.out.println("ERRO NA LINHA " + row.getRowNum() + ": " + e.getMessage());
                }
            }

            logs.add(new Log("LEITURA TURISMO INTERNACIONAL POR PAIS FINALIZADA", "SUCESSO", "ARQUIVO"));

        } catch (Exception e) {
            logs.add(new Log("ERRO LEITURA EXCEL TURISMO INTERNACIONAL POR PAIS", "ERRO", "ARQUIVO"));
            System.out.println(e.getMessage());
        }

        return lista;
    }

    public List<Log> getLogs() {
        return logs;
    }
}