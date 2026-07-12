using UglyToad.PdfPig;
using UglyToad.PdfPig.Writer;
namespace Libres.API.Features.Books.Application.Extensions
{
    public static class BookExtenstions
    {

        public static int GetPdfPageCount(string filePath, IHostEnvironment environment)
        {
            var fullPath = Path.Combine(environment.ContentRootPath, filePath);

            using var document = PdfDocument.Open(fullPath);
            return document.NumberOfPages;
        }
        public static long GetPdfSize(string filePath, IHostEnvironment environment)
        {
            var fullPath = Path.Combine(environment.ContentRootPath, filePath);

            var fileInfo = new FileInfo(fullPath);
            return fileInfo.Length;
        }
        public static byte[] GeneratePreviewBytes(
            string filePath,
            int startPage,
            int endPage,
            IHostEnvironment environment)
        {
            string fullPath = Path.Combine(environment.ContentRootPath, filePath);

            using (PdfDocument document = PdfDocument.Open(fullPath))
            {
                int pageCount = document.NumberOfPages;
                startPage = Math.Max(1, startPage);
                endPage = Math.Min(pageCount, endPage);

                PdfDocumentBuilder builder = new PdfDocumentBuilder();

                for (int i = startPage; i <= endPage; i++)
                {
                    builder.AddPage(document, i);
                }

                return builder.Build();
            }
        }

        public static byte[] GenerateFullBookBytes(
    string filePath,
    IHostEnvironment environment)
        {
            string fullPath = Path.Combine(environment.ContentRootPath, filePath);

            if (!System.IO.File.Exists(fullPath))
            {
                throw new FileNotFoundException("الكتاب غير موجود في المسار المحدد.", fullPath);
            }

            return System.IO.File.ReadAllBytes(fullPath);
        }
    }
}