        private string UpdateAutoWeight(string qrVal, string weightVal, Int16 flag)
            { // Update SP as Aug 24,2018
            string connetionString = null;
            SqlConnection cnn;
            SqlCommand cmd;
            string sql = null;
            string result = "NG";
           connetionString = "Data Source=" + DB_IP + ";Initial Catalog=" + DB_NAME + ";User ID=" + DB_USER + ";Password=" + DB_PASSWORD;
         //   connetionString = "Data Source=" + DB_IP + ";Initial Catalog=" + DB_NAME + ";User ID=" + DB_USER + ";Password=P@ssw0rd";
            //      connetionString = "Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password";
            //  sql = "EXEC UpdateAutoWeight @comet_seq='" + qrVal + "' ,  @box_gross_weight=" + weightVal ;
          
            
           sql = "EXEC UpdateAutoWeight @comet_seq='" + qrVal + "' ,  @box_gross_weight=" + weightVal + ",@upd_by='Mettler',@verify_flag=" + @flag + ",@oResult=''";

           // sql = "EXEC UpdateAutoWeight @comet_seq='" + qrVal + "' ,  @box_gross_weight=" + weightVal + ",@upd_by='Mettler',@verify_flag='" + @flag + "'";
            

            cnn = new SqlConnection(connetionString);
            try
                {
                cnn.Open();
                cmd = new SqlCommand(sql, cnn);
                var firstColumn = cmd.ExecuteScalar();
                if(firstColumn != null)
                    {
                    result = firstColumn.ToString();
                    }

                cmd.Dispose();
                cnn.Close();
                keepWeight = "";
                return result;

                //   MessageBox.Show(" No. of Rows " + count);
                }
            catch(Exception ex)
                {
              //  MessageBox.Show("UpdateAutoWeight ::Can not open connection ! " + ex.Message);
                    MZM_Log(System.Reflection.MethodBase.GetCurrentMethod().Name, "SYS--UpdateAutoWeight ", ex.Message);
                    keepWeight = "";
                return result;
                }
            }




        private void updateHistory(string p1, string qrVal, string weightVal, string p2, string p3, string p4)
            {
            string connetionString = null;
            SqlConnection cnn;
            SqlCommand cmd;
            string sql = null;
            string result = "NG";
            keepWeight = "";
            connetionString = "Data Source=" + DBP_IP + ";Initial Catalog=" + "conveyor" + ";User ID=" + "sa" + ";Password=" + "leibboos";

            //      connetionString = "Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password";
            sql = "INSERT into conveyor.dbo.Box_History (dt,QR_str,Weight,bExist,bSave,jStatus) VALUES (convert(datetime,'" + p1 + "',5),'" + qrVal + "','" + weightVal + "','" + p2 + "','" + p3 + "','" + p4 + "')";

            cnn = new SqlConnection(connetionString);
            try
                {
                cnn.Open();
                cmd = new SqlCommand(sql, cnn);
                var firstColumn = cmd.ExecuteScalar();
                if(firstColumn != null)
                    {
                    result = firstColumn.ToString();
                    }

                cmd.Dispose();
                cnn.Close();
                

                //   MessageBox.Show(" No. of Rows " + count);
                }
            catch(Exception ex)
                {
                //MessageBox.Show("updateHistory ::Can not open connection ! " + ex.Message);
                    MZM_Log(System.Reflection.MethodBase.GetCurrentMethod().Name, "SYS", ex.Message);                
                }
            }



            string updateRet = UpdateAutoWeight(qrVal, weightVal,1);
            updateRet = updateRet.ToUpper();
            if (updateRet == "OK"){ 
                //Success 
            } else  {
                // Fail
            }

                               Console.WriteLine("uPDateMZMDB :: No weight found");
                               
                               string updateRet = UpdateAutoWeight(qrVal, "0.00",99);



