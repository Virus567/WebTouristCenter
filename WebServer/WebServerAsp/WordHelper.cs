using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TouristСenterLibrary.Entity;
using Word = Microsoft.Office.Interop.Word;

namespace WebServerAsp
{
    public class WordHelper
    {
        private FileInfo _fileInfo;

        public string filename { get; set; }

        public WordHelper(string fileName)
        {
            if (File.Exists(fileName))
            {
                _fileInfo = new FileInfo(fileName);
            }
            else
            {
                throw new ArgumentException("file not found");
            }

        }

        public string AddClontract(Dictionary<string, string> items)
        {

            Word.Application app = null;
            try
            {
                app =new ();
                Object file = _fileInfo.FullName;
                Object missing = Type.Missing;

                app.Documents.Open(file);

                foreach(var item in items)
                {
                    Word.Find find = app.Selection.Find;
                    find.Text = item.Key;
                    find.Replacement.Text = item.Value;

                    Object wrap = Word.WdFindWrap.wdFindContinue;
                    Object replace = Word.WdReplace.wdReplaceAll;

                    find.Execute(FindText: Type.Missing,
                        MatchCase: false,
                        MatchWholeWord: false,
                        MatchWildcards: false,
                        MatchSoundsLike: missing,
                        MatchAllWordForms: false,
                        Forward: true,
                        Wrap: wrap,
                        Format: false,
                        ReplaceWith: missing,
                        Replace: replace);
                }
                string fileName = _fileInfo.Name + DateTime.Now.ToString("yyyyMMdd HHmmss")+".docx";
                Object newFileName = Path.Combine(_fileInfo.DirectoryName,fileName);
                app.ActiveDocument.SaveAs2(newFileName);
                app.ActiveDocument.Close();
                app.Quit();
                return newFileName.ToString();
            }
            catch (Exception ex)
            {
                if (app != null)
                {
                    app.Quit();
                }
                return "";
            }
        }
    }
}
