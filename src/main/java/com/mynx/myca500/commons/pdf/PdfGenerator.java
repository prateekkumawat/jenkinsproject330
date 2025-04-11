package com.mynx.myca500.commons.pdf;


import com.lowagie.text.Document;
import com.lowagie.text.html.simpleparser.HTMLWorker;
import com.lowagie.text.pdf.PdfWriter;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.StringReader;

public class PdfGenerator {
    public static byte[] generatePdf(String content) {
        ITextRenderer renderer = new ITextRenderer();
        renderer.setDocumentFromString(content);
        renderer.layout();
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        renderer.createPDF(stream);
        return stream.toByteArray();
    }
}
