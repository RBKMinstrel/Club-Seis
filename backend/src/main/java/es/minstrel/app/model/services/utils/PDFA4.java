package es.minstrel.app.model.services.utils;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;

import java.awt.*;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class PDFA4 {

    private final PDDocument document;
    private PDPage page;
    private PDPageContentStream contentStream;
    private final float margin;

    public PDFA4(float margin)
            throws IOException {
        this.margin = margin;
        this.document = new PDDocument();
        this.page = new PDPage(PDRectangle.A4);
        this.document.addPage(this.page);
        this.contentStream = new PDPageContentStream(this.document, this.page);
    }

    public void addNewPage()
            throws IOException {
        contentStream.close();
        page = new PDPage(PDRectangle.A4);
        document.addPage(page);
        contentStream = new PDPageContentStream(document, page);
    }

    public static float getWidthOfString(String text, float fontSize, PDFont font)
            throws IOException {
        return fontSize * font.getStringWidth(text) / 1000;
    }

    public static List<String> getLines(String text, float fontSize, PDFont font, float with)
            throws IOException {

        List<String> lines = new ArrayList<>();

        if (text == null || text.isEmpty())
            return lines;

        String[] words = text.split(" ");
        StringBuilder line = new StringBuilder();

        for (String word : words) {
            String tempLine = line + word + " ";
            float size = getWidthOfString(tempLine, fontSize, font);
            if (size > with) {
                lines.add(line.toString());
                line = new StringBuilder(word + " ");
            } else {
                line.append(word).append(" ");
            }
        }
        lines.add(line.toString());

        return lines;

    }

    private float writeLine(String line, float fontSize, PDFont font, Color color, float height, float width, float maxWidth)
            throws IOException {

        float leading = fontSize * 1.5f;

        if (maxWidth >= getWidthOfString(line, fontSize, font)) {
            contentStream.setFont(font, fontSize);
            contentStream.beginText();
            contentStream.newLineAtOffset(margin + width, margin + height);

            contentStream.setNonStrokingColor(color != null ? color : Color.BLACK);

            contentStream.showText(line);

            contentStream.endText();

            return leading;
        } else {
            List<String> lines = getLines(line, fontSize, font, maxWidth);
            float sum = 0;
            for (String lineItem : lines) {
                sum += writeLine(lineItem, fontSize, font, color, height - sum, width, maxWidth);
            }
            return sum;
        }

    }

    public float writeTextAlignLeft(List<String> lines, float fontSize, PDFont font, Color color, float height, float maxWidth, float offSet)
            throws IOException {

        float actualHeight = height;

        for (String line : lines) {

            if (actualHeight < 0) {

                addNewPage();

                actualHeight = getAvaibleHeight();

            }

            actualHeight -= writeLine(line, fontSize, font, color, actualHeight, offSet, maxWidth);

        }

        return actualHeight;
    }

    public float writeTextAlignLeft(List<String> lines, float fontSize, PDFont font, Color color, float height, float maxWidth)
            throws IOException {
        return writeTextAlignLeft(lines, fontSize, font, color, height, maxWidth, 0);
    }

    public float writeTextAlignLeft(String text, float fontSize, PDFont font, Color color, float height, float maxWidth, float offSet)
            throws IOException {

        List<String> lines = getLines(text, fontSize, font, maxWidth);

        return writeTextAlignLeft(lines, fontSize, font, color, height, maxWidth, offSet);
    }

    public float writeTextAlignLeft(String text, float fontSize, PDFont font, Color color, float height, float maxWidth)
            throws IOException {

        return writeTextAlignLeft(text, fontSize, font, color, height, maxWidth, 0);
    }

    public float writeTextAlignCenter(List<String> lines, float fontSize, PDFont font, Color color, float height, float maxWidth, float offSet)
            throws IOException {

        float actualHeight = height;

        for (String line : lines) {

            if (actualHeight < 0) {

                addNewPage();

                actualHeight = getAvaibleHeight();

            }

            float lineWidth = getWidthOfString(line, fontSize, font);
            float displacement = (getAvaibleWidth() - lineWidth) / 2f;

            actualHeight -= writeLine(line, fontSize, font, color, actualHeight, displacement + offSet, maxWidth);

        }

        return actualHeight;
    }

    public float writeTextAlignCenter(List<String> lines, float fontSize, PDFont font, Color color, float height, float maxWidth)
            throws IOException {
        return writeTextAlignCenter(lines, fontSize, font, color, height, maxWidth, 0);
    }

    public float writeTextAlignCenter(String text, float fontSize, PDFont font, Color color, float height, float maxWidth, float offSet)
            throws IOException {

        List<String> lines = getLines(text, fontSize, font, maxWidth);

        return writeTextAlignCenter(lines, fontSize, font, color, height, maxWidth, offSet);
    }

    public float writeTextAlignCenter(String text, float fontSize, PDFont font, Color color, float height, float maxWidth)
            throws IOException {
        return writeTextAlignCenter(text, fontSize, font, color, height, maxWidth, 0);
    }

    public float writeTextAlignRight(List<String> lines, float fontSize, PDFont font, Color color, float height, float maxWidth, float offSet)
            throws IOException {

        float actualHeight = height;

        for (String line : lines) {

            if (actualHeight < 0) {

                addNewPage();

                actualHeight = getAvaibleHeight();

            }

            float lineWidth = fontSize * font.getStringWidth(line) / 1000;
            float displacement = getAvaibleWidth() - lineWidth;

            actualHeight -= writeLine(line, fontSize, font, color, actualHeight, displacement - offSet, maxWidth);

        }

        return actualHeight;
    }

    public float writeTextAlignRight(List<String> lines, float fontSize, PDFont font, Color color, float height, float maxWidth)
            throws IOException {
        return writeTextAlignRight(lines, fontSize, font, color, height, maxWidth, 0);
    }

    public float writeTextAlignRight(String text, float fontSize, PDFont font, Color color, float height, float maxWidth, float offSet)
            throws IOException {

        List<String> lines = getLines(text, fontSize, font, maxWidth);

        return writeTextAlignRight(lines, fontSize, font, color, height, maxWidth, offSet);
    }

    public float writeTextAlignRight(String text, float fontSize, PDFont font, Color color, float height, float maxWidth)
            throws IOException {
        return writeTextAlignRight(text, fontSize, font, color, height, maxWidth, 0);
    }

    public float paintLine(float start, float end, float height, float wide)
            throws IOException {

        contentStream.setLineWidth(wide);
        contentStream.moveTo(start + margin, height + margin);
        contentStream.lineTo(end + margin, height + margin);
        contentStream.stroke();

        return height - wide / 2;
    }

    public float paintLine(float start, float end, float height)
            throws IOException {
        return paintLine(start, end, height, 1f);
    }

    public void drawTable(List<String> headers, List<List<String>> rows, PDFont font, float fontSize, Color color, float tableWidth, float height, float offSet)
            throws IOException {
        float rowHeight = fontSize * 1.5f;
        float tableHeight = rowHeight * (rows.size() + 1); // +1 for header
        float columnWidth = tableWidth / headers.size();

        // Draw the headers
        float nextY = height;
        contentStream.setFont(font, fontSize);
        contentStream.setNonStrokingColor(Color.BLACK);

        for (int i = 0; i < headers.size(); i++) {
            String header = headers.get(i);
            float textWidth = getWidthOfString(header, fontSize, font);
            float textX = offSet + i * columnWidth + (columnWidth - textWidth) / 2;
            contentStream.beginText();
            contentStream.newLineAtOffset(textX, nextY);
            contentStream.showText(header);
            contentStream.endText();
        }
        nextY -= rowHeight;

        // Draw the rows
        for (List<String> row : rows) {
            for (int i = 0; i < row.size(); i++) {
                String cell = row.get(i);
                float textWidth = getWidthOfString(cell, fontSize, font);
                float textX = offSet + i * columnWidth + (columnWidth - textWidth) / 2;
                contentStream.beginText();
                contentStream.newLineAtOffset(textX, nextY);
                contentStream.showText(cell);
                contentStream.endText();
            }
            nextY -= rowHeight;
        }

        // Draw the borders
        float nextX = offSet;
        float endX = offSet + tableWidth;
        float endY = height - tableHeight;

        for (int i = 0; i <= headers.size(); i++) {
            contentStream.moveTo(nextX, height);
            contentStream.lineTo(nextX, endY);
            contentStream.stroke();
            nextX += columnWidth;
        }

        nextY = height;
        for (int i = 0; i <= rows.size(); i++) {
            contentStream.moveTo(offSet, nextY);
            contentStream.lineTo(endX, nextY);
            contentStream.stroke();
            nextY -= rowHeight;
        }
    }

    public float getAvaibleHeight() {
        PDRectangle mediaBox = page.getMediaBox();
        return (mediaBox.getHeight() - 2 * margin);
    }

    public float getAvaibleWidth() {
        PDRectangle mediaBox = page.getMediaBox();
        return (mediaBox.getWidth() - 2 * margin);
    }

    public FileType close()
            throws IOException {
        contentStream.close();
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        document.save(out);
        return new FileType("application/pdf", out.toByteArray());
    }
}
