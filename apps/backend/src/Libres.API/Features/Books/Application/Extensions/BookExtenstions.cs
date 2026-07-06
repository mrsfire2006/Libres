using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UglyToad.PdfPig;

namespace Libres.API.Features.Books.Application.Extensions
{
    public static class BookExtenstions
    {
        public static int GetPdfPageCount(string filePath)
        {
            using var document = PdfDocument.Open(filePath);
            return document.NumberOfPages;
        }
        public static long GetPdfSize(string filePath)
        {
            var fileInfo = new FileInfo(filePath);
            return fileInfo.Length;
        }
    }
}