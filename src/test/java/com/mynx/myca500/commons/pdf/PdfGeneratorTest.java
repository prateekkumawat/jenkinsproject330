package com.mynx.myca500.commons.pdf;

import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class PdfGeneratorTest {

    @Test
    public void generateStaticPdf() throws IOException {
        String content = "<html><body><p>Hi</p></body></html>";
        byte []bytes = PdfGenerator.generatePdf(content);
        FileOutputStream fs = new FileOutputStream(new File("/home/mayank/testpdf.pdf"));
        fs.write(bytes);
        fs.close();
    }
}
