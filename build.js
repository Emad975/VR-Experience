// Build script — generates js/main.js for Periodic Table app
const fs = require('fs');

const ELEMENTS = [
 [1,'H','\u0647\u064a\u062f\u0631\u0648\u062c\u064a\u0646','Hydrogen',1.008,'nonmetal',1,1,[1],0,'\u0623\u062e\u0641 \u0627\u0644\u0639\u0646\u0627\u0635\u0631 \u0648\u0623\u0643\u062b\u0631\u0647\u0627 \u0648\u0641\u0631\u0629 \u0641\u064a \u0627\u0644\u0643\u0648\u0646. \u064a\u062f\u062e\u0644 \u0641\u064a \u062a\u0631\u0643\u064a\u0628 \u0627\u0644\u0645\u0627\u0621 H\u2082O \u0648\u064a\u064f\u0633\u062a\u062e\u062f\u0645 \u0648\u0642\u0648\u062f\u0627\u064b \u0646\u0638\u064a\u0641\u0627\u064b \u0644\u0644\u0645\u0633\u062a\u0642\u0628\u0644.'],
 [2,'He','\u0647\u064a\u0644\u064a\u0648\u0645','Helium',4.003,'noble',1,18,[2],2,'\u063a\u0627\u0632 \u062e\u0627\u0645\u0644 \u062e\u0641\u064a\u0641 \u062c\u062f\u0627\u064b. \u064a\u064f\u0633\u062a\u062e\u062f\u0645 \u0644\u0645\u0644\u0621 \u0627\u0644\u0628\u0627\u0644\u0648\u0646\u0627\u062a \u0648\u0627\u0644\u0645\u0646\u0627\u0637\u064a\u062f. \u0644\u0627 \u064a\u0634\u062a\u0639\u0644 \u0648\u0644\u0627 \u064a\u062a\u0641\u0627\u0639\u0644 \u0645\u0639 \u063a\u064a\u0631\u0647.'],
 [3,'Li','\u0644\u064a\u062b\u064a\u0648\u0645','Lithium',6.941,'alkali',2,1,[2,1],4,'\u0641\u0644\u0632 \u0642\u0644\u0648\u064a \u062e\u0641\u064a\u0641 \u064a\u0637\u0641\u0648 \u0639\u0644\u0649 \u0627\u0644\u0645\u0627\u0621. \u064a\u062f\u062e\u0644 \u0641\u064a \u0635\u0646\u0627\u0639\u0629 \u0628\u0637\u0627\u0631\u064a\u0627\u062a \u0627\u0644\u0647\u0648\u0627\u062a\u0641 \u0648\u0627\u0644\u0633\u064a\u0627\u0631\u0627\u062a.'],
 [4,'Be','\u0628\u064a\u0631\u064a\u0644\u064a\u0648\u0645','Beryllium',9.012,'alkaline',2,2,[2,2],5,'\u0641\u0644\u0632 \u062e\u0641\u064a\u0641 \u0635\u0644\u0628 \u064a\u062f\u062e\u0644 \u0641\u064a \u0633\u0628\u0627\u0626\u0643 \u0627\u0644\u0641\u0636\u0627\u0621.'],
 [5,'B','\u0628\u0648\u0631\u0648\u0646','Boron',10.81,'metalloid',2,13,[2,3],6,'\u0634\u0628\u0647 \u0641\u0644\u0632. \u064a\u062f\u062e\u0644 \u0641\u064a \u0635\u0646\u0627\u0639\u0629 \u0627\u0644\u0632\u062c\u0627\u062c \u0627\u0644\u0645\u0642\u0627\u0648\u0645 \u0644\u0644\u062d\u0631\u0627\u0631\u0629.'],
 [6,'C','\u0643\u0631\u0628\u0648\u0646','Carbon',12.011,'nonmetal',2,14,[2,4],6,'\u0623\u0633\u0627\u0633 \u0627\u0644\u062d\u064a\u0627\u0629. \u064a\u0643\u0648\u0651\u0646 \u0645\u0644\u0627\u064a\u064a\u0646 \u0627\u0644\u0645\u0631\u0643\u0628\u0627\u062a \u0627\u0644\u0639\u0636\u0648\u064a\u0629. \u0627\u0644\u0645\u0627\u0633 \u0623\u0635\u0644\u0628 \u0645\u0648\u0627\u062f \u0627\u0644\u0637\u0628\u064a\u0639\u0629.'],
 [7,'N','\u0646\u064a\u062a\u0631\u0648\u062c\u064a\u0646','Nitrogen',14.007,'nonmetal',2,15,[2,5],7,'\u064a\u0634\u0643\u0651\u0644 78% \u0645\u0646 \u0627\u0644\u0647\u0648\u0627\u0621. \u0636\u0631\u0648\u0631\u064a \u0644\u0628\u0646\u0627\u0621 \u0627\u0644\u0628\u0631\u0648\u062a\u064a\u0646\u0627\u062a \u0648\u0627\u0644\u062d\u0645\u0636 \u0627\u0644\u0646\u0648\u0648\u064a.'],
 [8,'O','\u0623\u0643\u0633\u062c\u064a\u0646','Oxygen',15.999,'nonmetal',2,16,[2,6],8,'\u0636\u0631\u0648\u0631\u064a \u0644\u0644\u062a\u0646\u0641\u0633 \u0648\u0627\u0644\u0627\u062d\u062a\u0631\u0627\u0642. \u064a\u0634\u0643\u0651\u0644 21% \u0645\u0646 \u0627\u0644\u0647\u0648\u0627\u0621. \u062b\u0627\u0644\u062b \u0623\u0643\u062b\u0631 \u0639\u0646\u0635\u0631 \u0641\u064a \u0627\u0644\u0643\u0648\u0646.'],
 [9,'F','\u0641\u0644\u0648\u0631','Fluorine',18.998,'halogen',2,17,[2,7],10,'\u0623\u0642\u0648\u0649 \u0639\u0627\u0645\u0644 \u0643\u064a\u0645\u064a\u0627\u0626\u064a \u0648\u0623\u0634\u062f\u0647\u0627 \u062a\u0641\u0627\u0639\u0644\u0627\u064b. \u064a\u062f\u062e\u0644 \u0641\u064a \u062a\u0631\u0643\u064a\u0628 \u0645\u0639\u062c\u0648\u0646 \u0627\u0644\u0623\u0633\u0646\u0627\u0646.'],
 [10,'Ne','\u0646\u064a\u0648\u0646','Neon',20.18,'noble',2,18,[2,8],10,'\u063a\u0627\u0632 \u0646\u0628\u064a\u0644 \u064a\u062a\u0648\u0647\u062c \u0628\u0627\u0644\u0644\u0648\u0646 \u0627\u0644\u0628\u0631\u062a\u0642\u0627\u0644\u064a. \u064a\u064f\u0633\u062a\u062e\u062f\u0645 \u0641\u064a \u0627\u0644\u0644\u0627\u0641\u062a\u0627\u062a.'],
 [11,'Na','\u0635\u0648\u062f\u064a\u0648\u0645','Sodium',22.99,'alkali',3,1,[2,8,1],12,'\u0645\u0644\u062d \u0627\u0644\u0637\u0639\u0627\u0645 (NaCl). \u0636\u0631\u0648\u0631\u064a \u0644\u0639\u0645\u0644 \u0627\u0644\u0623\u0639\u0635\u0627\u0628.'],
 [12,'Mg','\u0645\u0627\u063a\u0646\u064a\u0633\u064a\u0648\u0645','Magnesium',24.305,'alkaline',3,2,[2,8,2],12,'\u0636\u0631\u0648\u0631\u064a \u0644\u0639\u0638\u0627\u0645 \u0627\u0644\u0625\u0646\u0633\u0627\u0646. \u064a\u062f\u062e\u0644 \u0641\u064a \u0633\u0628\u0627\u0626\u0643 \u0627\u0644\u0637\u0627\u0626\u0631\u0627\u062a.'],
 [13,'Al','\u0623\u0644\u0648\u0645\u0646\u064a\u0648\u0645','Aluminium',26.982,'post',3,13,[2,8,3],14,'\u0623\u0643\u062b\u0631 \u0627\u0644\u0641\u0644\u0632\u0627\u062a \u0648\u0641\u0631\u0629 \u0641\u064a \u0642\u0634\u0631\u0629 \u0627\u0644\u0623\u0631\u0636. \u064a\u062f\u062e\u0644 \u0641\u064a \u0635\u0646\u0627\u0639\u0629 \u0627\u0644\u0639\u0644\u0628 \u0648\u0647\u064a\u0627\u0643\u0644 \u0627\u0644\u0637\u0627\u0626\u0631\u0627\u062a.'],
 [14,'Si','\u0633\u064a\u0644\u064a\u0643\u0648\u0646','Silicon',28.086,'metalloid',3,14,[2,8,4],14,'\u0623\u0633\u0627\u0633 \u0635\u0646\u0627\u0639\u0629 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a\u0627\u062a \u0648\u0627\u0644\u062d\u0648\u0627\u0633\u064a\u0628.'],
 [15,'P','\u0641\u0633\u0641\u0648\u0631','Phosphorus',30.974,'nonmetal',3,15,[2,8,5],16,'\u0636\u0631\u0648\u0631\u064a \u0644\u0628\u0646\u0627\u0621 DNA \u0648\u0639\u0638\u0627\u0645 \u0627\u0644\u0625\u0646\u0633\u0627\u0646.'],
 [16,'S','\u0643\u0628\u0631\u064a\u062a','Sulfur',32.06,'nonmetal',3,16,[2,8,6],16,'\u0639\u0646\u0635\u0631 \u0623\u0635\u0641\u0631 \u0630\u0648 \u0631\u0627\u0626\u062d\u0629 \u0645\u0645\u064a\u0632\u0629. \u064a\u062f\u062e\u0644 \u0641\u064a \u0635\u0646\u0627\u0639\u0629 \u062d\u0645\u0636 \u0627\u0644\u0643\u0628\u0631\u064a\u062a\u064a\u0643.'],
 [17,'Cl','\u0643\u0644\u0648\u0631','Chlorine',35.453,'halogen',3,17,[2,8,7],18,'\u064a\u064f\u0633\u062a\u062e\u062f\u0645 \u0644\u062a\u0639\u0642\u064a\u0645 \u0645\u064a\u0627\u0647 \u0627\u0644\u0634\u0631\u0628 \u0648\u0645\u0633\u0627\u0628\u062d \u0627\u0644\u0633\u0628\u0627\u062d\u0629.'],
 [18,'Ar','\u0623\u0631\u063a\u0648\u0646','Argon',39.948,'noble',3,18,[2,8,8],22,'\u063a\u0627\u0632 \u0646\u0628\u064a\u0644 \u064a\u0634\u0643\u0651\u0644 1% \u0645\u0646 \u0627\u0644\u0647\u0648\u0627\u0621.'],
 [19,'K','\u0628\u0648\u062a\u0627\u0633\u064a\u0648\u0645','Potassium',39.098,'alkali',4,1,[2,8,8,1],20,'\u0636\u0631\u0648\u0631\u064a \u0644\u0639\u0645\u0644 \u0627\u0644\u0642\u0644\u0628 \u0648\u0627\u0644\u0639\u0636\u0644\u0627\u062a.'],
 [20,'Ca','\u0643\u0627\u0644\u0633\u064a\u0648\u0645','Calcium',40.078,'alkaline',4,2,[2,8,8,2],20,'\u0623\u0633\u0627\u0633 \u0628\u0646\u0627\u0621 \u0627\u0644\u0639\u0638\u0627\u0645 \u0648\u0627\u0644\u0623\u0633\u0646\u0627\u0646.'],
 [21,'Sc','\u0633\u0643\u0627\u0646\u062f\u064a\u0648\u0645','Scandium',44.956,'trans',4,3,[2,8,9,2],24,''],
 [22,'Ti','\u062a\u064a\u062a\u0627\u0646\u064a\u0648\u0645','Titanium',47.867,'trans',4,4,[2,8,10,2],26,'\u0641\u0644\u0632 \u0642\u0648\u064a \u062e\u0641\u064a\u0641 \u064a\u062f\u062e\u0644 \u0641\u064a \u0635\u0646\u0627\u0639\u0629 \u0627\u0644\u0637\u0627\u0626\u0631\u0627\u062a \u0648\u0627\u0644\u063a\u0631\u0633\u0627\u062a \u0627\u0644\u0637\u0628\u064a\u0629.'],
 [23,'V','\u0641\u0627\u0646\u0627\u062f\u064a\u0648\u0645','Vanadium',50.942,'trans',4,5,[2,8,11,2],28,''],
 [24,'Cr','\u0643\u0631\u0648\u0645','Chromium',51.996,'trans',4,6,[2,8,13,1],28,'\u064a\u0639\u0637\u064a \u0627\u0644\u0641\u0648\u0644\u0627\u0630 \u0645\u0638\u0647\u0631\u0647 \u0627\u0644\u0644\u0627\u0645\u0639.'],
 [25,'Mn','\u0645\u0646\u063a\u0646\u064a\u0632','Manganese',54.938,'trans',4,7,[2,8,13,2],30,''],
 [26,'Fe','\u062d\u062f\u064a\u062f','Iron',55.845,'trans',4,8,[2,8,14,2],30,'\u0627\u0644\u0641\u0644\u0632 \u0627\u0644\u0623\u0643\u062b\u0631 \u0627\u0633\u062a\u062e\u062f\u0627\u0645\u0627\u064b. \u0623\u0633\u0627\u0633 \u0627\u0644\u0641\u0648\u0644\u0627\u0630 \u0648\u0627\u0644\u0635\u0644\u0628. \u064a\u062d\u0645\u0644 \u0627\u0644\u062f\u0645 \u0627\u0644\u0623\u0643\u0633\u062c\u064a\u0646.'],
 [27,'Co','\u0643\u0648\u0628\u0627\u0644\u062a','Cobalt',58.933,'trans',4,9,[2,8,15,2],32,''],
 [28,'Ni','\u0646\u064a\u0643\u0644','Nickel',58.693,'trans',4,10,[2,8,16,2],31,''],
 [29,'Cu','\u0646\u062d\u0627\u0633','Copper',63.546,'trans',4,11,[2,8,18,1],35,'\u0645\u0648\u0635\u0644 \u062c\u064a\u062f \u0644\u0644\u0643\u0647\u0631\u0628\u0627\u0621. \u064a\u062f\u062e\u0644 \u0641\u064a \u0633\u0644\u0643 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621 \u0648\u0645\u0643\u0648\u0646\u0627\u062a \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a\u0627\u062a.'],
 [30,'Zn','\u0632\u0646\u0643','Zinc',65.38,'trans',4,12,[2,8,18,2],35,''],
 [31,'Ga','\u063a\u0627\u0644\u064a\u0648\u0645','Gallium',69.723,'post',4,13,[2,8,18,3],39,''],
 [32,'Ge','\u062c\u0631\u0645\u0627\u0646\u064a\u0648\u0645','Germanium',72.63,'metalloid',4,14,[2,8,18,4],41,''],
 [33,'As','\u0632\u0631\u0646\u064a\u062e','Arsenic',74.922,'metalloid',4,15,[2,8,18,5],42,''],
 [34,'Se','\u0633\u064a\u0644\u064a\u0646\u064a\u0648\u0645','Selenium',78.971,'nonmetal',4,16,[2,8,18,6],45,''],
 [35,'Br','\u0628\u0631\u0648\u0645','Bromine',79.904,'halogen',4,17,[2,8,18,7],45,''],
 [36,'Kr','\u0643\u0631\u064a\u0628\u062a\u0648\u0646','Krypton',83.798,'noble',4,18,[2,8,18,8],48,''],
 [37,'Rb','\u0631\u0648\u0628\u064a\u062f\u064a\u0648\u0645','Rubidium',85.468,'alkali',5,1,[2,8,18,8,1],48,''],
 [38,'Sr','\u0633\u062a\u0631\u0648\u0646\u0634\u064a\u0648\u0645','Strontium',87.62,'alkaline',5,2,[2,8,18,8,2],50,''],
 [39,'Y','\u064a\u062a\u0631\u064a\u0648\u0645','Yttrium',88.906,'trans',5,3,[2,8,18,9,2],50,''],
 [40,'Zr','\u0632\u064a\u0631\u0643\u0648\u0646\u064a\u0648\u0645','Zirconium',91.224,'trans',5,4,[2,8,18,10,2],51,''],
 [41,'Nb','\u0646\u064a\u0648\u0628\u064a\u0648\u0645','Niobium',92.906,'trans',5,5,[2,8,18,12,1],52,''],
 [42,'Mo','\u0645\u0648\u0644\u064a\u0628\u062f\u064a\u0646\u0648\u0645','Molybdenum',95.96,'trans',5,6,[2,8,18,13,1],54,''],
 [43,'Tc','\u062a\u0643\u0646\u064a\u0634\u064a\u0648\u0645','Technetium',98,'trans',5,7,[2,8,18,13,2],55,''],
 [44,'Ru','\u0631\u0648\u062b\u064a\u0646\u064a\u0648\u0645','Ruthenium',101.07,'trans',5,8,[2,8,18,15,1],57,''],
 [45,'Rh','\u0631\u0648\u062f\u064a\u0648\u0645','Rhodium',102.906,'trans',5,9,[2,8,18,16,1],58,''],
 [46,'Pd','\u0628\u0627\u0644\u064a\u062f\u064a\u0648\u0645','Palladium',106.42,'trans',5,10,[2,8,18,18],60,''],
 [47,'Ag','\u0641\u0636\u0629','Silver',107.868,'trans',5,11,[2,8,18,18,1],61,'\u0645\u0646\u0630 \u0622\u0644\u0627\u0641 \u0627\u0644\u0633\u0646\u064a\u0646 \u064a\u064f\u0633\u062a\u062e\u062f\u0645 \u0639\u0645\u0644\u0629 \u0648\u062d\u0644\u064a\u0629. \u0623\u0641\u0636\u0644 \u0645\u0648\u0635\u0644 \u0644\u0644\u0643\u0647\u0631\u0628\u0627\u0621.'],
 [48,'Cd','\u0643\u0627\u062f\u0645\u064a\u0648\u0645','Cadmium',112.411,'trans',5,12,[2,8,18,18,2],64,''],
 [49,'In','\u0625\u0646\u062f\u064a\u0648\u0645','Indium',114.818,'post',5,13,[2,8,18,18,3],66,''],
 [50,'Sn','\u0642\u0635\u062f\u064a\u0631','Tin',118.71,'post',5,14,[2,8,18,18,4],69,''],
 [51,'Sb','\u0623\u0646\u062a\u064a\u0645\u0648\u0646','Antimony',121.76,'metalloid',5,15,[2,8,18,18,5],71,''],
 [52,'Te','\u062a\u064a\u0644\u0648\u0631\u064a\u0648\u0645','Tellurium',127.6,'metalloid',5,16,[2,8,18,18,6],76,''],
 [53,'I','\u064a\u0648\u062f','Iodine',126.904,'halogen',5,17,[2,8,18,18,7],74,'\u0636\u0631\u0648\u0631\u064a \u0644\u0639\u0645\u0644 \u0627\u0644\u063a\u062f\u0629 \u0627\u0644\u062f\u0631\u0642\u064a\u0629.'],
 [54,'Xe','\u0632\u064a\u0646\u0648\u0646','Xenon',131.293,'noble',5,18,[2,8,18,18,8],77,''],
 [55,'Cs','\u0633\u064a\u0632\u064a\u0648\u0645','Caesium',132.905,'alkali',6,1,[2,8,18,18,8,1],78,''],
 [56,'Ba','\u0628\u0627\u0631\u064a\u0648\u0645','Barium',137.327,'alkaline',6,2,[2,8,18,18,8,2],81,''],
 [57,'La','\u0644\u0627\u0646\u062b\u0627\u0646\u0648\u0645','Lanthanum',138.905,'lantha',6,3,[2,8,18,18,9,2],82,''],
 [58,'Ce','\u0633\u064a\u0631\u064a\u0648\u0645','Cerium',140.116,'lantha',6,4,[2,8,18,19,9,2],82,''],
 [59,'Pr','\u0628\u0631\u0627\u0633\u064a\u0648\u062f\u064a\u0645\u064a\u0648\u0645','Praseodymium',140.908,'lantha',6,5,[2,8,18,21,8,2],82,''],
 [60,'Nd','\u0646\u064a\u0648\u062f\u064a\u0645\u064a\u0648\u0645','Neodymium',144.242,'lantha',6,6,[2,8,18,22,8,2],84,''],
 [61,'Pm','\u0628\u0631\u0648\u0645\u062b\u064a\u0648\u0645','Promethium',145,'lantha',6,7,[2,8,18,23,8,2],84,''],
 [62,'Sm','\u0633\u0627\u0645\u0627\u0631\u064a\u0648\u0645','Samarium',150.36,'lantha',6,8,[2,8,18,24,8,2],88,''],
 [63,'Eu','\u064a\u0648\u0631\u0648\u0628\u064a\u0648\u0645','Europium',151.964,'lantha',6,9,[2,8,18,25,8,2],89,''],
 [64,'Gd','\u063a\u0627\u062f\u0648\u0644\u064a\u0646\u064a\u0648\u0645','Gadolinium',157.25,'lantha',6,10,[2,8,18,25,9,2],93,''],
 [65,'Tb','\u062a\u064a\u0631\u0628\u064a\u0648\u0645','Terbium',158.925,'lantha',6,11,[2,8,18,27,8,2],94,''],
 [66,'Dy','\u062f\u064a\u0633\u0628\u0631\u0648\u0633\u064a\u0648\u0645','Dysprosium',162.5,'lantha',6,12,[2,8,18,28,8,2],97,''],
 [67,'Ho','\u0647\u0648\u0644\u0645\u064a\u0648\u0645','Holmium',164.93,'lantha',6,13,[2,8,18,29,8,2],98,''],
 [68,'Er','\u0625\u0631\u0628\u064a\u0648\u0645','Erbium',167.259,'lantha',6,14,[2,8,18,30,8,2],99,''],
 [69,'Tm','\u062b\u0648\u0644\u064a\u0648\u0645','Thulium',168.934,'lantha',6,15,[2,8,18,31,8,2],100,''],
 [70,'Yb','\u064a\u062a\u0631\u0628\u064a\u0648\u0645','Ytterbium',173.04,'lantha',6,16,[2,8,18,32,8,2],103,''],
 [71,'Lu','\u0644\u0648\u062a\u064a\u0634\u064a\u0648\u0645','Lutetium',174.967,'lantha',6,17,[2,8,18,32,9,2],104,''],
 [72,'Hf','\u0647\u0627\u0641\u0646\u064a\u0648\u0645','Hafnium',178.49,'trans',6,4,[2,8,18,32,10,2],106,''],
 [73,'Ta','\u062a\u0646\u062a\u0627\u0644\u0648\u0645','Tantalum',180.948,'trans',6,5,[2,8,18,32,11,2],108,''],
 [74,'W','\u062a\u0646\u063a\u0633\u062a\u0646','Tungsten',183.84,'trans',6,6,[2,8,18,32,12,2],110,'\u0623\u0639\u0644\u0649 \u0646\u0642\u0637\u0629 \u0627\u0646\u0635\u0647\u0627\u0631 \u0628\u064a\u0646 \u0627\u0644\u0639\u0646\u0627\u0635\u0631. \u0641\u062a\u064a\u0644\u0629 \u0645\u0635\u0628\u0627\u062d \u0627\u0644\u062a\u0646\u063a\u0633\u062a\u0646 \u062a\u0635\u0644 3422 \u062f\u0631\u062c\u0629.'],
 [75,'Re','\u0631\u064a\u0646\u064a\u0648\u0645','Rhenium',186.207,'trans',6,7,[2,8,18,32,13,2],111,''],
 [76,'Os','\u0623\u0648\u0632\u0645\u064a\u0648\u0645','Osmium',190.23,'trans',6,8,[2,8,18,32,14,2],114,''],
 [77,'Ir','\u0625\u064a\u0631\u064a\u062f\u064a\u0648\u0645','Iridium',192.217,'trans',6,9,[2,8,18,32,15,2],115,''],
 [78,'Pt','\u0628\u0644\u0627\u062a\u064a\u0646','Platinum',195.084,'trans',6,10,[2,8,18,32,17,1],117,'\u0641\u0644\u0632 \u062b\u0645\u064a\u0646 \u0644\u0627\u0645\u0639 \u0644\u0627 \u064a\u0635\u062f\u0623. \u064a\u064f\u0633\u062a\u062e\u062f\u0645 \u0641\u064a \u0627\u0644\u0645\u062c\u0648\u0647\u0631\u0627\u062a.'],
 [79,'Au','\u0630\u0647\u0628','Gold',196.967,'trans',6,11,[2,8,18,32,18,1],118,'\u0645\u0646\u0630 \u0622\u0644\u0627\u0641 \u0627\u0644\u0633\u0646\u064a\u0646 \u064a\u064f\u0633\u062a\u062e\u062f\u0645 \u0639\u0645\u0644\u0629 \u0648\u062d\u0644\u064a\u0629. \u0644\u0627 \u064a\u0635\u062f\u0623 \u0648\u0644\u0627 \u064a\u062a\u0641\u0627\u0639\u0644.'],
 [80,'Hg','\u0632\u0626\u0628\u0642','Mercury',200.592,'trans',6,12,[2,8,18,32,18,2],121,'\u0627\u0644\u0641\u0644\u0632 \u0627\u0644\u0648\u062d\u064a\u062f \u0627\u0644\u0633\u0627\u0626\u0644 \u0639\u0646\u062f \u062f\u0631\u062c\u0629 \u062d\u0631\u0627\u0631\u0629 \u0627\u0644\u063a\u0631\u0641\u0629.'],
 [81,'Tl','\u062b\u0627\u0644\u064a\u0648\u0645','Thallium',204.38,'post',6,13,[2,8,18,32,18,3],123,''],
 [82,'Pb','\u0631\u0635\u0627\u0635','Lead',207.2,'post',6,14,[2,8,18,32,18,4],125,'\u0641\u0644\u0632 \u062b\u0642\u064a\u0644. \u064a\u062d\u0645\u064a \u0645\u0646 \u0627\u0644\u0625\u0634\u0639\u0627\u0639 \u0627\u0644\u0646\u0648\u0648\u064a.'],
 [83,'Bi','\u0628\u0632\u0645\u0648\u062a','Bismuth',208.98,'post',6,15,[2,8,18,32,18,5],126,''],
 [84,'Po','\u0628\u0648\u0644\u0648\u0646\u064a\u0648\u0645','Polonium',209,'metalloid',6,16,[2,8,18,32,18,6],125,''],
 [85,'At','\u0623\u0633\u062a\u0627\u062a\u064a\u0646','Astatine',210,'halogen',6,17,[2,8,18,32,18,7],125,''],
 [86,'Rn','\u0631\u0627\u062f\u0648\u0646','Radon',222,'noble',6,18,[2,8,18,32,18,8],136,''],
 [87,'Fr','\u0641\u0631\u0627\u0646\u0633\u064a\u0648\u0645','Francium',223,'alkali',7,1,[2,8,18,32,18,8,1],136,''],
 [88,'Ra','\u0631\u0627\u062f\u064a\u0648\u0645','Radium',226,'alkaline',7,2,[2,8,18,32,18,8,2],138,'\u0639\u0646\u0635\u0631 \u0645\u0634\u0639 \u0627\u0643\u062a\u0634\u0641\u062a\u0647 \u0645\u0627\u0631\u064a \u0643\u064a\u0648\u0631\u064a.'],
 [89,'Ac','\u0623\u0643\u062a\u064a\u0646\u064a\u0648\u0645','Actinium',227,'actini',7,3,[2,8,18,32,18,9,2],138,''],
 [90,'Th','\u062b\u0648\u0631\u064a\u0648\u0645','Thorium',232.038,'actini',7,4,[2,8,18,32,18,10,2],142,''],
 [91,'Pa','\u0628\u0631\u0648\u062a\u0627\u0643\u062a\u064a\u0646\u064a\u0648\u0645','Protactinium',231.036,'actini',7,5,[2,8,18,32,20,9,2],140,''],
 [92,'U','\u064a\u0648\u0631\u0627\u0646\u064a\u0648\u0645','Uranium',238.029,'actini',7,6,[2,8,18,32,21,9,2],146,'\u064a\u064f\u0633\u062a\u062e\u062f\u0645 \u0648\u0642\u0648\u062f\u0627\u064b \u0641\u064a \u0627\u0644\u0645\u0641\u0627\u0639\u0644\u0627\u062a \u0627\u0644\u0646\u0648\u0648\u064a\u0629. \u064a\u0646\u062a\u062c \u0637\u0627\u0642\u0629 \u0647\u0627\u0626\u0644\u0629.'],
 [93,'Np','\u0646\u0628\u062a\u0648\u0646\u064a\u0648\u0645','Neptunium',237,'actini',7,7,[2,8,18,32,22,9,2],144,''],
 [94,'Pu','\u0628\u0644\u0648\u062a\u0648\u0646\u064a\u0648\u0645','Plutonium',244,'actini',7,8,[2,8,18,32,24,8,2],150,''],
 [95,'Am','\u0623\u0645\u0631\u064a\u0634\u064a\u0648\u0645','Americium',243,'actini',7,9,[2,8,18,32,25,8,2],148,''],
 [96,'Cm','\u0643\u064a\u0648\u0631\u064a\u0648\u0645','Curium',247,'actini',7,10,[2,8,18,32,25,9,2],151,''],
 [97,'Bk','\u0628\u064a\u0631\u0643\u064a\u0644\u064a\u0648\u0645','Berkelium',247,'actini',7,11,[2,8,18,32,27,8,2],150,''],
 [98,'Cf','\u0643\u0627\u0644\u064a\u0641\u0648\u0631\u0646\u064a\u0648\u0645','Californium',251,'actini',7,12,[2,8,18,32,28,8,2],153,''],
 [99,'Es','\u0622\u064a\u0646\u0634\u062a\u0627\u0646\u064a\u0648\u0645','Einsteinium',252,'actini',7,13,[2,8,18,32,29,8,2],153,''],
 [100,'Fm','\u0641\u064a\u0631\u0645\u064a\u0648\u0645','Fermium',257,'actini',7,14,[2,8,18,32,30,8,2],157,''],
 [101,'Md','\u0645\u0646\u062f\u0644\u0641\u064a\u0648\u0645','Mendelevium',258,'actini',7,15,[2,8,18,32,31,8,2],157,''],
 [102,'No','\u0646\u0648\u0628\u064a\u0644\u064a\u0648\u0645','Nobelium',259,'actini',7,16,[2,8,18,32,32,8,2],157,''],
 [103,'Lr','\u0644\u0648\u0631\u0646\u0633\u064a\u0648\u0645','Lawrencium',266,'actini',7,17,[2,8,18,32,32,8,3],163,''],
 [104,'Rf','\u0631\u0630\u0631\u0641\u0648\u0631\u062f\u064a\u0648\u0645','Rutherfordium',267,'trans',7,4,[2,8,18,32,32,10,2],163,''],
 [105,'Db','\u062f\u0648\u0628\u0646\u064a\u0648\u0645','Dubnium',268,'trans',7,5,[2,8,18,32,32,11,2],163,''],
 [106,'Sg','\u0633\u064a\u0628\u0648\u0631\u063a\u064a\u0648\u0645','Seaborgium',269,'trans',7,6,[2,8,18,32,32,12,2],163,''],
 [107,'Bh','\u0628\u0648\u0631\u064a\u0648\u0645','Bohrium',270,'trans',7,7,[2,8,18,32,32,13,2],163,''],
 [108,'Hs','\u0647\u0627\u0633\u064a\u0648\u0645','Hassium',277,'trans',7,8,[2,8,18,32,32,14,2],169,''],
 [109,'Mt','\u0645\u0627\u064a\u062a\u0646\u064a\u0631\u064a\u0648\u0645','Meitnerium',278,'unknown',7,9,[2,8,18,32,32,15,2],169,''],
 [110,'Ds','\u062f\u0627\u0631\u0645\u0634\u062a\u0627\u062a\u064a\u0648\u0645','Darmstadtium',281,'unknown',7,10,[2,8,18,32,32,17,1],171,''],
 [111,'Rg','\u0631\u0648\u0646\u062a\u063a\u064a\u0646\u064a\u0648\u0645','Roentgenium',282,'unknown',7,11,[2,8,18,32,32,18,1],171,''],
 [112,'Cn','\u0643\u0648\u0628\u0631\u0646\u064a\u0633\u064a\u0648\u0645','Copernicium',285,'trans',7,12,[2,8,18,32,32,18,2],173,''],
 [113,'Nh','\u0646\u064a\u0647\u0648\u0646\u064a\u0648\u0645','Nihonium',286,'post',7,13,[2,8,18,32,32,18,3],173,''],
 [114,'Fl','\u0641\u0644\u064a\u0631\u0648\u0641\u064a\u0648\u0645','Flerovium',289,'post',7,14,[2,8,18,32,32,18,4],175,''],
 [115,'Mc','\u0645\u0648\u0633\u0643\u0648\u0641\u064a\u0648\u0645','Moscovium',290,'post',7,15,[2,8,18,32,32,18,5],175,''],
 [116,'Lv','\u0644\u064a\u0641\u0631\u0645\u0648\u0631\u064a\u0648\u0645','Livermorium',293,'post',7,16,[2,8,18,32,32,18,6],177,''],
 [117,'Ts','\u062a\u064a\u0646\u064a\u0633\u064a\u0646','Tennessine',294,'halogen',7,17,[2,8,18,32,32,18,7],177,''],
 [118,'Og','\u0623\u0648\u063a\u0627\u0646\u064a\u0633\u0648\u0646','Oganesson',294,'noble',7,18,[2,8,18,32,32,18,8],176,'']
];

const EL_JSON = JSON.stringify(ELEMENTS.map(r=>({n:r[0],sym:r[1],ar:r[2],en:r[3],mass:r[4],cat:r[5],period:r[6],group:r[7],shells:r[8],neutrons:r[9],desc:r[10]})));

// Element visual data: [state, r, g, b]
// state: 's'=solid metal, 'g'=gas, 'n'=noble gas glow, 'l'=liquid
const EL_VIS = {
  1:['g',200,225,255],7:['g',185,210,245],8:['g',160,205,255],
  9:['g',225,245,160],17:['g',185,240,110],
  2:['n',255,120,40],10:['n',255,55,15],18:['n',155,75,255],
  36:['n',100,165,255],54:['n',75,120,255],86:['n',200,230,255],118:['n',180,200,255],
  35:['l',175,35,15],80:['l',185,190,200],
  5:['s',75,60,50],6:['s',40,42,48],15:['s',245,225,60],16:['s',255,205,5],
  29:['s',184,115,51],47:['s',205,208,215],50:['s',190,193,200],
  78:['s',210,212,218],79:['s',255,200,50],82:['s',100,102,115],83:['s',205,180,210]
};
const EL_VIS_JSON = JSON.stringify(EL_VIS);

const js = `// Periodic Table Interactive — Edama
(function(){
'use strict';
var ELEMENTS=${EL_JSON};
var EL_VIS=${EL_VIS_JSON};
var CAT={
  alkali:{cls:'c-alkali',ar:'\u0641\u0644\u0632\u0627\u062a \u0642\u0644\u0648\u064a\u0629'},
  alkaline:{cls:'c-alkaline',ar:'\u0641\u0644\u0632\u0627\u062a \u0642\u0644\u0648\u064a\u0629 \u062a\u0631\u0627\u0628\u064a\u0629'},
  trans:{cls:'c-trans',ar:'\u0641\u0644\u0632\u0627\u062a \u0627\u0646\u062a\u0642\u0627\u0644\u064a\u0629'},
  post:{cls:'c-post',ar:'\u0641\u0644\u0632\u0627\u062a \u0628\u0639\u062f \u0627\u0646\u062a\u0642\u0627\u0644\u064a\u0629'},
  metalloid:{cls:'c-meta',ar:'\u0623\u0634\u0628\u0627\u0647 \u0641\u0644\u0632\u0627\u062a'},
  nonmetal:{cls:'c-nonmetal',ar:'\u0644\u0627\u0641\u0644\u0632\u0627\u062a'},
  halogen:{cls:'c-halogen',ar:'\u0647\u0627\u0644\u0648\u062c\u064a\u0646\u0627\u062a'},
  noble:{cls:'c-noble',ar:'\u063a\u0627\u0632\u0627\u062a \u0646\u0628\u064a\u0644\u0629'},
  lantha:{cls:'c-lantha',ar:'\u0644\u0627\u0646\u062b\u0627\u0646\u064a\u062f\u0627\u062a'},
  actini:{cls:'c-actini',ar:'\u0623\u0643\u062a\u064a\u0646\u064a\u062f\u0627\u062a'},
  unknown:{cls:'c-unknown',ar:'\u063a\u064a\u0631 \u0645\u0639\u0631\u0648\u0641'}
};
var POS=[null,
  [1,1],[1,18],[2,1],[2,2],[2,13],[2,14],[2,15],[2,16],[2,17],[2,18],
  [3,1],[3,2],[3,13],[3,14],[3,15],[3,16],[3,17],[3,18],
  [4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[4,8],[4,9],[4,10],[4,11],[4,12],[4,13],[4,14],[4,15],[4,16],[4,17],[4,18],
  [5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8],[5,9],[5,10],[5,11],[5,12],[5,13],[5,14],[5,15],[5,16],[5,17],[5,18],
  [6,1],[6,2],
  [9,3],[9,4],[9,5],[9,6],[9,7],[9,8],[9,9],[9,10],[9,11],[9,12],[9,13],[9,14],[9,15],[9,16],[9,17],
  [6,4],[6,5],[6,6],[6,7],[6,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[6,15],[6,16],[6,17],[6,18],
  [7,1],[7,2],
  [10,3],[10,4],[10,5],[10,6],[10,7],[10,8],[10,9],[10,10],[10,11],[10,12],[10,13],[10,14],[10,15],[10,16],[10,17],
  [7,4],[7,5],[7,6],[7,7],[7,8],[7,9],[7,10],[7,11],[7,12],[7,13],[7,14],[7,15],[7,16],[7,17],[7,18]
];
var EL={};
ELEMENTS.forEach(function(e){EL[e.n]=e;});
var activeCatFilter=null;
function buildLegend(){
  var lg=document.getElementById('legend');
  Object.keys(CAT).forEach(function(k){
    var c=CAT[k];
    var d=document.createElement('div');d.className='leg-item';d.dataset.cat=k;
    d.innerHTML='<div class="leg-dot '+c.cls+'"></div><span>'+c.ar+'</span>';
    d.addEventListener('click',function(){filterCat(k);});
    lg.appendChild(d);
  });
}
function filterCat(cat){
  if(activeCatFilter===cat){activeCatFilter=null;}else{activeCatFilter=cat;}
  document.querySelectorAll('.leg-item').forEach(function(li){
    li.classList.toggle('active-filter',li.dataset.cat===activeCatFilter);
  });
  applyFilter(document.getElementById('search-inp').value);
}
function applyFilter(q){
  q=(q||'').trim().toLowerCase();
  ELEMENTS.forEach(function(e){
    var card=document.getElementById('el-'+e.n);if(!card)return;
    var matchSearch=!q||(e.sym.toLowerCase().indexOf(q)>-1||e.en.toLowerCase().indexOf(q)>-1||e.ar.indexOf(q)>-1||String(e.n)===q);
    var matchCat=!activeCatFilter||(e.cat===activeCatFilter);
    var match=matchSearch&&matchCat;
    card.classList.toggle('dim',!match);
    card.classList.toggle('highlight',match&&(q.length>0||activeCatFilter));
  });
}
function searchEl(q){
  var inp=document.getElementById('search-inp');
  if(inp&&inp.value!==q)inp.value=q;
  var res=document.getElementById('search-results');
  applyFilter(q);
  if(!q){res.innerHTML='';return;}
  var ql=q.trim().toLowerCase();
  var hits=ELEMENTS.filter(function(e){
    return e.sym.toLowerCase().indexOf(ql)>-1||e.en.toLowerCase().indexOf(ql)>-1||e.ar.indexOf(ql)>-1||String(e.n)===ql;
  }).slice(0,12);
  res.innerHTML=hits.map(function(e){
    var cat=CAT[e.cat]||CAT.unknown;
    return '<div class="sr-chip '+cat.cls+'" onclick="onEl('+e.n+')">'+e.sym+' — '+e.ar+'</div>';
  }).join('');
}
function buildTable(){
  var pt=document.getElementById('ptable');pt.innerHTML='';
  var l6=mkLbl('\u0644\u0627\u0646\u062b\u0627\u0646\u064a\u062f\u0627\u062a *');l6.style.cssText='grid-row:6;grid-column:3;';pt.appendChild(l6);
  var l7=mkLbl('\u0623\u0643\u062a\u064a\u0646\u064a\u062f\u0627\u062a *');l7.style.cssText='grid-row:7;grid-column:3;';pt.appendChild(l7);
  ELEMENTS.forEach(function(e){
    var pos=POS[e.n];if(!pos)return;
    var card=document.createElement('div');
    card.className='el '+(CAT[e.cat]?CAT[e.cat].cls:'c-unknown');
    card.id='el-'+e.n;
    card.style.gridRow=pos[0];card.style.gridColumn=pos[1];
    card.title=e.ar+' \u2014 '+e.en;
    card.innerHTML='<div class="el-num">'+e.n+'</div><div class="el-sym">'+e.sym+'</div><div class="el-nar">'+e.ar+'</div>';
    card.addEventListener('click',function(){onEl(e.n);});
    pt.appendChild(card);
  });
}
function mkLbl(t){var d=document.createElement('div');d.className='tbl-label';d.style.fontSize='7px';d.innerHTML=t;return d;}
var mode='explore',compareSlot='left',presentIdx=1,buildStep=0,buildEl=null,atomAnim=null,presentAnim=null;
var quizQ=[],quizCur=0,quizScore=0;
function setMode(m){
  mode=m;
  document.querySelectorAll('.mode-btn').forEach(function(b){b.classList.toggle('active',b.dataset.mode===m);});
  clearSel();
  ['quiz-panel','compare-panel','reaction-panel'].forEach(function(id){var p=document.getElementById(id);if(p)p.classList.add('hidden');});
  if(m==='quiz'){document.getElementById('quiz-panel').classList.remove('hidden');startQuiz();setStatus('\u0627\u0646\u0642\u0631 \u0639\u0644\u0649 \u0627\u0644\u0639\u0646\u0635\u0631 \u0627\u0644\u0635\u062d\u064a\u062d');}
  else if(m==='compare'){document.getElementById('compare-panel').classList.remove('hidden');compareSlot='left';setStatus('\u0627\u0646\u0642\u0631 \u0639\u0646\u0635\u0631\u064a\u0646 \u0644\u0645\u0642\u0627\u0631\u0646\u062a\u0647\u0645\u0627');}
  else if(m==='reaction'){document.getElementById('reaction-panel').classList.remove('hidden');if(window.rxnSetMode)window.rxnSetMode();setStatus('\u0645\u062e\u062a\u0628\u0631 \u0627\u0644\u062a\u0641\u0627\u0639\u0644\u0627\u062a \u2014 \u0627\u062e\u062a\u0631 \u0639\u0646\u0627\u0635\u0631 \u0645\u0646 \u0627\u0644\u062c\u062f\u0648\u0644');}
  else setStatus(m==='build'?'\u0627\u0646\u0642\u0631 \u0639\u0646\u0635\u0631\u0627\u064b \u0644\u0628\u0646\u0627\u0621 \u0630\u0631\u062a\u0647':'\u0627\u0646\u0642\u0631 \u0639\u0644\u0649 \u0623\u064a \u0639\u0646\u0635\u0631 \ud83d\udd2c');
}
function clearSel(){document.querySelectorAll('.el').forEach(function(c){c.className=c.className.replace(/ ?(selected|compare-picked|quiz-correct|quiz-wrong|quiz-dim)/g,'');});}
function onEl(n){
  if(mode==='explore')openExplore(n);
  else if(mode==='build')openBuild(n);
  else if(mode==='quiz')handleQuizClick(n);
  else if(mode==='compare')handleCmpClick(n);
  else if(mode==='reaction'){if(window.rxnOnEl)window.rxnOnEl(n);}
}
function openExplore(n){
  var e=EL[n];if(!e)return;
  clearSel();document.getElementById('el-'+n).classList.add('selected');
  document.getElementById('build-extras').style.display='none';
  fillInfo(e);document.getElementById('atom-modal').classList.remove('hidden');
  stopAtom();atomAnim=startAtom(document.getElementById('atom-canvas'),e,99);
}
/* ── Element photo canvas renderers ── */
function _drawMetal(c,cx,cy,R,r,g,b){
  var bg=c.createRadialGradient(cx,cy,R*.05,cx,cy,R*1.4);
  bg.addColorStop(0,'rgba(20,25,40,1)');bg.addColorStop(1,'rgba(5,8,20,1)');
  c.fillStyle=bg;c.fillRect(0,0,cx*2,cy*2);
  var g2=c.createRadialGradient(cx-R*.3,cy-R*.3,R*.05,cx,cy,R);
  g2.addColorStop(0,'rgb('+Math.min(255,r+80)+','+Math.min(255,g+80)+','+Math.min(255,b+80)+')');
  g2.addColorStop(.4,'rgb('+r+','+g+','+b+')');
  g2.addColorStop(1,'rgb('+Math.max(0,r-60)+','+Math.max(0,g-60)+','+Math.max(0,b-60)+')');
  c.beginPath();c.arc(cx,cy,R,0,Math.PI*2);c.fillStyle=g2;c.fill();
  var g3=c.createRadialGradient(cx-R*.32,cy-R*.32,0,cx-R*.28,cy-R*.28,R*.45);
  g3.addColorStop(0,'rgba(255,255,255,.72)');g3.addColorStop(.5,'rgba(255,255,255,.14)');g3.addColorStop(1,'rgba(255,255,255,0)');
  c.beginPath();c.arc(cx,cy,R,0,Math.PI*2);c.fillStyle=g3;c.fill();
}
function _drawGas(c,cx,cy,R,r,g,b){
  c.fillStyle='rgb(8,12,24)';c.fillRect(0,0,cx*2,cy*2);
  var g1=c.createRadialGradient(cx,cy,0,cx,cy,R);
  g1.addColorStop(0,'rgba('+r+','+g+','+b+',.55)');
  g1.addColorStop(.6,'rgba('+r+','+g+','+b+',.25)');
  g1.addColorStop(1,'rgba('+r+','+g+','+b+',.04)');
  c.beginPath();c.arc(cx,cy,R*1.15,0,Math.PI*2);c.fillStyle=g1;c.fill();
  var g2=c.createRadialGradient(cx-R*.3,cy-R*.3,0,cx-R*.3,cy-R*.3,R*.35);
  g2.addColorStop(0,'rgba(255,255,255,.55)');g2.addColorStop(1,'rgba(255,255,255,0)');
  c.beginPath();c.arc(cx,cy,R*1.15,0,Math.PI*2);c.fillStyle=g2;c.fill();
}
function _drawNoble(c,cx,cy,R,r,g,b){
  c.fillStyle='rgb(4,5,15)';c.fillRect(0,0,cx*2,cy*2);
  var i,gx;
  for(i=3;i>=0;i--){
    gx=c.createRadialGradient(cx,cy,R*.2,cx,cy,R*(1.1+i*.28));
    gx.addColorStop(0,'rgba('+r+','+g+','+b+','+(0.26-i*.04)+')');
    gx.addColorStop(1,'rgba('+r+','+g+','+b+',0)');
    c.beginPath();c.arc(cx,cy,R*(1.1+i*.28),0,Math.PI*2);c.fillStyle=gx;c.fill();
  }
  var inn=c.createRadialGradient(cx,cy,0,cx,cy,R*.8);
  inn.addColorStop(0,'rgba('+Math.min(255,r+120)+','+Math.min(255,g+120)+','+Math.min(255,b+120)+',.9)');
  inn.addColorStop(.5,'rgba('+r+','+g+','+b+',.55)');
  inn.addColorStop(1,'rgba('+r+','+g+','+b+',0)');
  c.beginPath();c.arc(cx,cy,R*.8,0,Math.PI*2);c.fillStyle=inn;c.fill();
}
function _drawLiquid(c,cx,cy,R,r,g,b){
  c.fillStyle='rgb(8,10,22)';c.fillRect(0,0,cx*2,cy*2);
  var py=cy+R*.12,pw=R*1.05,ph=R*.52;
  var g1=c.createRadialGradient(cx,py,0,cx,py,pw);
  g1.addColorStop(0,'rgb('+Math.min(255,r+60)+','+Math.min(255,g+60)+','+Math.min(255,b+60)+')');
  g1.addColorStop(.6,'rgb('+r+','+g+','+b+')');
  g1.addColorStop(1,'rgb('+Math.max(0,r-50)+','+Math.max(0,g-50)+','+Math.max(0,b-50)+')');
  c.beginPath();c.ellipse(cx,py,pw,ph,0,0,Math.PI*2);c.fillStyle=g1;c.fill();
  var shine=c.createLinearGradient(cx-pw*.4,py-ph*.4,cx+pw*.2,py-ph*.2);
  shine.addColorStop(0,'rgba(255,255,255,0)');shine.addColorStop(.45,'rgba(255,255,255,.5)');shine.addColorStop(1,'rgba(255,255,255,0)');
  c.beginPath();c.ellipse(cx-pw*.05,py-ph*.1,pw*.55,ph*.25,-.2,0,Math.PI*2);c.fillStyle=shine;c.fill();
  var dg=c.createRadialGradient(cx-R*.08,cy-R*.22,0,cx,cy-R*.18,R*.32);
  dg.addColorStop(0,'rgb('+Math.min(255,r+80)+','+Math.min(255,g+80)+','+Math.min(255,b+80)+')');
  dg.addColorStop(1,'rgb('+r+','+g+','+b+')');
  c.beginPath();c.arc(cx,cy-R*.18,R*.32,0,Math.PI*2);c.fillStyle=dg;c.fill();
}
function drawElementPhoto(cv,e){
  var c=cv.getContext('2d');
  var W=cv.width,H=cv.height,cx=W/2,cy=H/2,R=Math.min(W,H)*.39;
  var vis=EL_VIS[e.n],st,r,g,b;
  if(vis){st=vis[0];r=vis[1];g=vis[2];b=vis[3];}
  else if(e.cat==='noble'){st='n';r=150;g=180;b=255;}
  else if(e.cat==='nonmetal'){st='g';r=200;g=220;b=245;}
  else if(e.cat==='halogen'){st='g';r=195;g=235;b=155;}
  else{st='s';r=175;g=178;b=188;}
  if(st==='n')_drawNoble(c,cx,cy,R,r,g,b);
  else if(st==='l')_drawLiquid(c,cx,cy,R,r,g,b);
  else if(st==='g')_drawGas(c,cx,cy,R,r,g,b);
  else _drawMetal(c,cx,cy,R,r,g,b);
}
/* ── end element photo ── */
function fillInfo(e){
  var cat=CAT[e.cat]||CAT.unknown;
  var sh=e.shells.map(function(n,i){return '<div class="shell-grp"><div class="shell-n">'+n+'</div><div class="shell-lbl">\u063a\u0644\u0627\u0641'+(i+1)+'</div></div>';}).join('<div class="shell-sep">\u2192</div>');
  document.getElementById('element-info').innerHTML=
    '<canvas id="el-photo-c" width="150" height="150" class="el-photo-c"></canvas>'+
    '<div class="ei-sym" style="color:hsl('+(e.n*31%360)+',80%,70%)">'+e.sym+'</div>'+
    '<div class="ei-name">'+e.ar+'</div><div class="ei-name-en">'+e.en+'</div>'+
    '<div class="info-grid">'+
    ii('\u0627\u0644\u0639\u062f\u062f \u0627\u0644\u0630\u0631\u064a',e.n)+ii('\u0627\u0644\u0643\u062a\u0644\u0629',e.mass)+
    ii('\u0628\u0631\u0648\u062a\u0648\u0646\u0627\u062a',e.n)+ii('\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u0627\u062a',e.n)+
    ii('\u0646\u064a\u0648\u062a\u0631\u0648\u0646\u0627\u062a',e.neutrons)+ii('\u0627\u0644\u0641\u0635\u064a\u0644\u0629',cat.ar)+
    '</div>'+
    '<div class="shells-row"><div class="shells-label">\u062a\u0648\u0632\u064a\u0639 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u0627\u062a</div><div class="shells-dots">'+sh+'</div></div>'+
    '<div class="ei-desc">'+(e.desc||('\u0639\u0646\u0635\u0631 '+e.ar+' \u0645\u0646 \u0641\u0635\u064a\u0644\u0629 '+cat.ar+'.'))+'</div>';
  setTimeout(function(){var cv=document.getElementById('el-photo-c');if(cv)drawElementPhoto(cv,e);},0);
}
function ii(l,v){return '<div class="info-item"><div class="info-label">'+l+'</div><div class="info-val">'+v+'</div></div>';}
var BSTEPS=[
  '\u2b50 \u0627\u0628\u062f\u0623 \u0628\u0627\u0644\u0646\u0648\u0627\u0629 \u0627\u0644\u0641\u0627\u0631\u063a\u0629',
  '\u274e \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0628\u0631\u0648\u062a\u0648\u0646\u0627\u062a (\u062d\u0645\u0631\u0627\u0621)',
  '\u26aa \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0646\u064a\u0648\u062a\u0631\u0648\u0646\u0627\u062a (\u0631\u0645\u0627\u062f\u064a\u0629)',
  '\ud83d\udfe1 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u0627\u062a',
  '\u2705 \u0627\u0644\u0630\u0631\u0629 \u0645\u0643\u062a\u0645\u0644\u0629!'
];
function openBuild(n){buildEl=EL[n];if(!buildEl)return;buildStep=0;clearSel();document.getElementById('el-'+n).classList.add('selected');fillInfo(buildEl);document.getElementById('atom-modal').classList.remove('hidden');document.getElementById('build-extras').style.display='block';updBuild();}
function updBuild(){
  var p='';for(var i=0;i<BSTEPS.length;i++)p+='<div class="bpd'+(i<buildStep?' done':i===buildStep?' cur':'')+'"></div>';
  document.getElementById('build-prog').innerHTML=p;
  document.getElementById('build-lbl').textContent=BSTEPS[Math.min(buildStep,BSTEPS.length-1)];
  stopAtom();atomAnim=startAtom(document.getElementById('atom-canvas'),buildEl,buildStep);
}
function buildNext(){if(buildStep<BSTEPS.length-1){buildStep++;updBuild();}}
function buildPrev(){if(buildStep>0){buildStep--;updBuild();}}
function rndEl(){return ELEMENTS[Math.floor(Math.random()*ELEMENTS.length)];}
function rndElExcept(ns){var e;do{e=rndEl();}while(ns.indexOf(e.n)>-1);return e;}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
function _uniq4(correct,getFn,key){
  var opts=[correct];var seen=[correct[key]];
  while(opts.length<4){var c=getFn();if(seen.indexOf(c[key])===-1){seen.push(c[key]);opts.push(c);}}
  return shuffle(opts);
}
function buildQuestions(){
  var qs=[];
  var used=[];
  var pool=shuffle(ELEMENTS.slice()).slice(0,30);
  pool.forEach(function(e){
    var type=qs.length%8;
    var cat=CAT[e.cat]||CAT.unknown;
    if(type===0){
      // ما رمز هذا العنصر؟ — hide sym
      var opts=_uniq4(e,function(){return rndElExcept([e.n]);},'sym');
      qs.push({el:e,hide:'sym',q:'\u0645\u0627 \u0631\u0645\u0632 \u0639\u0646\u0635\u0631 '+e.ar+'\u061f',choices:opts.map(function(x){return x.sym;}),ans:e.sym});
    } else if(type===1){
      // ما اسم العنصر الذي رمزه X؟ — show only symbol
      var opts2=_uniq4(e,function(){return rndElExcept([e.n]);},'sym');
      qs.push({el:null,sym:e.sym,hide:'',q:'\u0645\u0627 \u0627\u0633\u0645 \u0627\u0644\u0639\u0646\u0635\u0631 \u0627\u0644\u0630\u064a \u0631\u0645\u0632\u0647 ('+e.sym+')\u061f',choices:opts2.map(function(x){return x.ar;}),ans:e.ar});
    } else if(type===2){
      // كم عدد البروتونات؟ — hide atomic number
      var ns=[e.n];var opts3=[e.n];
      while(opts3.length<4){var x=Math.floor(Math.random()*118)+1;if(ns.indexOf(x)===-1){ns.push(x);opts3.push(x);}}
      qs.push({el:e,hide:'n',q:'\u0643\u0645 \u0639\u062f\u062f \u0627\u0644\u0628\u0631\u0648\u062a\u0648\u0646\u0627\u062a \u0641\u064a \u0646\u0648\u0627\u0629 '+e.ar+'\u061f',choices:shuffle(opts3),ans:e.n});
    } else if(type===3){
      // إلى أي فصيلة ينتمي؟ — hide category
      var cats=Object.keys(CAT).filter(function(k){return k!==e.cat;});shuffle(cats);
      var choicesCat=[cat.ar];
      for(var ci=0;ci<3;ci++){choicesCat.push((CAT[cats[ci]]||CAT.unknown).ar);}
      qs.push({el:e,hide:'cat',q:'\u0625\u0644\u0649 \u0623\u064a \u0641\u0635\u064a\u0644\u0629 \u064a\u0646\u062a\u0645\u064a \u0639\u0646\u0635\u0631 '+e.ar+'\u061f',choices:shuffle(choicesCat),ans:cat.ar});
    } else if(type===4){
      // كم عدد النيوترونات؟ — neutrons not shown in card anyway
      var nns=[e.neutrons];var opts4=[e.neutrons];
      while(opts4.length<4){var nx=e.neutrons+Math.floor(Math.random()*20)-10;if(nx>0&&nns.indexOf(nx)===-1){nns.push(nx);opts4.push(nx);}}
      qs.push({el:e,hide:'',q:'\u0643\u0645 \u0639\u062f\u062f \u0627\u0644\u0646\u064a\u0648\u062a\u0631\u0648\u0646\u0627\u062a \u0641\u064a \u0630\u0631\u0629 '+e.ar+'\u061f',choices:shuffle(opts4),ans:e.neutrons});
    } else if(type===5){
      // كم عدد الأغلفة؟ — not shown in card
      var sh=e.shells.length;var sns=[sh];var opts5=[sh];
      while(opts5.length<4){var sx=Math.floor(Math.random()*7)+1;if(sns.indexOf(sx)===-1){sns.push(sx);opts5.push(sx);}}
      qs.push({el:e,hide:'',q:'\u0643\u0645 \u0639\u062f\u062f \u0645\u0633\u062a\u0648\u064a\u0627\u062a \u0627\u0644\u0637\u0627\u0642\u0629 (\u0627\u0644\u0623\u063a\u0644\u0641\u0629) \u0641\u064a \u0639\u0646\u0635\u0631 '+e.ar+'\u061f',choices:shuffle(opts5),ans:sh});
    } else if(type===6){
      // ما الكتلة الذرية؟ — not shown in card
      var m=Math.round(e.mass);var ms=[m];var opts6=[m];
      while(opts6.length<4){var mx=m+Math.floor(Math.random()*30)-15;if(mx>0&&ms.indexOf(mx)===-1){ms.push(mx);opts6.push(mx);}}
      qs.push({el:e,hide:'',q:'\u0645\u0627 \u0627\u0644\u0643\u062a\u0644\u0629 \u0627\u0644\u0630\u0631\u064a\u0629 \u0627\u0644\u062a\u0642\u0631\u064a\u0628\u064a\u0629 \u0644\u0639\u0646\u0635\u0631 '+e.ar+' \u0628\u0627\u0644\u0648\u062d\u062f\u0629 \u0627\u0644\u0630\u0631\u064a\u0629\u061f',choices:shuffle(opts6),ans:m});
    } else {
      // في أي دورة يقع؟ — hide period (not directly shown but add period hide)
      var pr=e.period;var ps=[pr];var opts7=[pr];
      while(opts7.length<4){var px=Math.floor(Math.random()*7)+1;if(ps.indexOf(px)===-1){ps.push(px);opts7.push(px);}}
      qs.push({el:e,hide:'',q:'\u0641\u064a \u0623\u064a \u062f\u0648\u0631\u0629 \u064a\u0642\u0639 \u0639\u0646\u0635\u0631 '+e.ar+'\u061f',choices:shuffle(opts7),ans:pr});
    }
  });
  return shuffle(qs).slice(0,12);
}
function startQuiz(){
  document.getElementById('quiz-result').style.display='none';
  document.getElementById('quiz-game').style.display='flex';
  quizQ=buildQuestions();
  quizCur=0;quizScore=0;showQ();
}
function showQ(){
  if(quizCur>=quizQ.length){showResult();return;}
  var q=quizQ[quizCur];
  var total=quizQ.length;
  document.getElementById('quiz-score').textContent=quizScore+' / '+quizCur;
  document.getElementById('quiz-progress-fill').style.width=Math.round(quizCur/total*100)+'%';
  document.getElementById('quiz-fb').textContent='';
  document.getElementById('quiz-fb').className='quiz-fb';
  document.getElementById('quiz-next').classList.add('hidden');
  // element card — hide the field being tested
  var card=document.getElementById('quiz-el-card');
  if(q.el){
    var cat=CAT[q.el.cat]||CAT.unknown;
    var hue=(q.el.n*31%360);
    var nHtml   = q.hide==='n'
      ? '<div class="qz-el-n qz-hidden">?</div>'
      : '<div class="qz-el-n">'+q.el.n+'</div>';
    var symHtml = q.hide==='sym'
      ? '<div class="qz-el-sym qz-hidden">?</div>'
      : '<div class="qz-el-sym '+cat.cls+'" style="color:hsl('+hue+',80%,70%)">'+q.el.sym+'</div>';
    var catHtml = q.hide==='cat'
      ? ''
      : '<div class="qz-el-cat">'+cat.ar+'</div>';
    card.innerHTML='<div class="qz-el-card">'+nHtml+symHtml+'<div class="qz-el-ar">'+q.el.ar+'</div>'+catHtml+'</div>';
  } else if(q.sym){
    card.innerHTML='<div class="qz-el-card"><div class="qz-el-sym" style="color:#60a5fa;font-size:3.8rem">'+q.sym+'</div></div>';
  } else {
    card.innerHTML='';
  }
  document.getElementById('quiz-q').textContent=q.q;
  var chWrap=document.getElementById('quiz-choices');
  chWrap.innerHTML='';
  q.choices.forEach(function(c){
    var btn=document.createElement('button');
    btn.className='qc-btn';
    btn.textContent=(c===null?'\u2014':c);
    btn.addEventListener('click',function(){handleChoice(btn,c);});
    chWrap.appendChild(btn);
  });
}
function handleChoice(btn,val){
  var q=quizQ[quizCur];if(!q)return;
  if(document.querySelectorAll('.qc-btn')[0].disabled)return;
  var ok=(String(val)===String(q.ans));
  if(ok)quizScore++;
  document.querySelectorAll('.qc-btn').forEach(function(b){
    b.disabled=true;
    if(String(b.textContent)===String(q.ans))b.classList.add('correct');
  });
  if(!ok)btn.classList.add('wrong');
  var fb=document.getElementById('quiz-fb');
  fb.textContent=ok?'\u2705 \u0625\u062c\u0627\u0628\u0629 \u0635\u062d\u064a\u062d\u0629\u060c \u0623\u062d\u0633\u0646\u062a!':'\u274c \u0627\u0644\u0625\u062c\u0627\u0628\u0629 \u0627\u0644\u0635\u062d\u064a\u062d\u0629: '+q.ans;
  fb.className='quiz-fb '+(ok?'ok':'bad');
  document.getElementById('quiz-score').textContent=quizScore+' / '+(quizCur+1);
  document.getElementById('quiz-next').classList.remove('hidden');
}
function handleQuizClick(){}
function nextQuestion(){quizCur++;showQ();}
function showResult(){
  document.getElementById('quiz-progress-fill').style.width='100%';
  document.getElementById('quiz-game').style.display='none';
  document.getElementById('quiz-result').style.display='flex';
  var p=Math.round(quizScore/quizQ.length*100);
  var stars=p>=90?'\u2b50\u2b50\u2b50':p>=70?'\u2b50\u2b50':p>=50?'\u2b50':'';
  document.getElementById('result-stars').textContent=stars;
  document.getElementById('result-title').textContent=p>=90?'\u0645\u0645\u062a\u0627\u0632 \u062c\u062f\u0627\u064b!':p>=70?'\u062c\u064a\u062f \u062c\u062f\u0627\u064b!':p>=50?'\u062c\u064a\u062f \u2014 \u0627\u0633\u062a\u0645\u0631!':'\u062d\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649';
  document.getElementById('result-sub').textContent='\u0646\u062a\u064a\u062c\u062a\u0643: '+quizScore+' \u0645\u0646 '+quizQ.length+' \u2014 ('+p+'%)';
  document.getElementById('quiz-score').textContent=quizScore+' / '+quizQ.length;
}
function closeQuiz(){document.getElementById('quiz-panel').classList.add('hidden');mode='explore';setMode('explore');}
var cmpL=null,cmpR=null;
function pickCompare(s){
  compareSlot=s;
  var panel=document.getElementById('compare-panel');
  panel.classList.add('picking');
  var slotAr=s==='left'?'\u0627\u0644\u064a\u0633\u0627\u0631':'\u0627\u0644\u064a\u0645\u064a\u0646';
  document.getElementById('pick-hint').innerHTML=
    '\u2190 \u0627\u0646\u0642\u0631 \u0639\u0644\u0649 \u0639\u0646\u0635\u0631 \u0645\u0646 \u0627\u0644\u062c\u062f\u0648\u0644 \u0644\u062e\u0627\u0646\u0629 '+slotAr+
    ' &nbsp;<button onclick="cancelPick()" style="background:#ef4444;border:none;color:#fff;padding:4px 12px;border-radius:6px;cursor:pointer;font-size:.9rem">\u0625\u0644\u063a\u0627\u0621</button>';
}
function cancelPick(){document.getElementById('compare-panel').classList.remove('picking');}
function handleCmpClick(n){
  var e=EL[n];if(!e)return;
  if(compareSlot==='left')cmpL=e;else cmpR=e;
  document.getElementById('compare-panel').classList.remove('picking');
  renderCmp();
  compareSlot=(compareSlot==='left')?'right':'left';
}
function renderCmp(){renderCmpCard('cmp-left',cmpL,cmpR);renderCmpCard('cmp-right',cmpR,cmpL);}
function renderCmpCard(id,e,o){
  var el=document.getElementById(id);
  if(!e){el.className='cmp-card cmp-empty';el.innerHTML='\u0627\u0646\u0642\u0631 \u0639\u0646\u0635\u0631\u0627\u064b \u0645\u0646 \u0627\u0644\u062c\u062f\u0648\u0644';el.onclick=function(){pickCompare(id.includes('left')?'left':'right');};return;}
  el.className='cmp-card';el.onclick=null;
  var cat=CAT[e.cat]||CAT.unknown;
  var stats=[['\u0627\u0644\u0639\u062f\u062f \u0627\u0644\u0630\u0631\u064a',e.n,o?e.n-o.n:0],['\u0627\u0644\u0643\u062a\u0644\u0629',e.mass,o?e.mass-o.mass:0],['\u0628\u0631\u0648\u062a\u0648\u0646\u0627\u062a',e.n,o?e.n-o.n:0],['\u0646\u064a\u0648\u062a\u0631\u0648\u0646\u0627\u062a',e.neutrons,o?e.neutrons-o.neutrons:0],['\u0623\u063a\u0644\u0641\u0629',e.shells.length,o?e.shells.length-o.shells.length:0]];
  el.innerHTML='<div class="cmp-sym '+cat.cls+'" style="border-radius:6px;padding:2px 8px;">'+e.sym+'</div><div class="cmp-name">'+e.ar+'</div><div class="cmp-name-en">'+e.en+'</div><div class="cmp-stats">'+stats.map(function(s){var h=o?(s[2]>0?'hi':s[2]<0?'lo':''):'';return '<div class="cmp-stat"><span>'+s[0]+'</span><span class="cmp-stat-v '+h+'">'+s[1]+'</span></div>';}).join('')+'</div>';
}
function closeCompare(){document.getElementById('compare-panel').classList.add('hidden');cmpL=null;cmpR=null;setMode('explore');}
function openPresent(){document.getElementById('present-overlay').classList.remove('hidden');presentIdx=1;renderPresent();try{document.documentElement.requestFullscreen();}catch(e){}}
function closePresent(){document.getElementById('present-overlay').classList.add('hidden');stopPresAnim();try{document.exitFullscreen();}catch(e){}}
function presentMove(d){presentIdx=Math.max(1,Math.min(118,presentIdx+d));renderPresent();}
function renderPresent(){
  var e=EL[presentIdx];if(!e)return;
  var cat=CAT[e.cat]||CAT.unknown;
  var sh=e.shells.map(function(n,i){return '<div class="p-shell-g"><div class="p-shell-n">'+n+'</div><div class="p-shell-l">\u063a\u0644\u0627\u0641'+(i+1)+'</div></div>';}).join('<div class="p-shell-sep">\u2192</div>');
  document.getElementById('present-info').innerHTML=
    '<div class="p-num">\u0627\u0644\u0639\u062f\u062f \u0627\u0644\u0630\u0631\u064a: '+e.n+'</div>'+
    '<div class="p-sym" style="color:hsl('+(e.n*31%360)+',80%,70%)">'+e.sym+'</div>'+
    '<div class="p-name">'+e.ar+'</div><div class="p-name-en">'+e.en+'</div>'+
    '<div class="p-facts"><div class="p-fact"><div class="p-fact-lbl">\u0627\u0644\u0643\u062a\u0644\u0629 \u0627\u0644\u0630\u0631\u064a\u0629</div><div class="p-fact-v">'+e.mass+'</div></div><div class="p-fact"><div class="p-fact-lbl">\u0628\u0631\u0648\u062a\u0648\u0646\u0627\u062a</div><div class="p-fact-v">'+e.n+'</div></div><div class="p-fact"><div class="p-fact-lbl">\u0646\u064a\u0648\u062a\u0631\u0648\u0646\u0627\u062a</div><div class="p-fact-v">'+e.neutrons+'</div></div></div>'+
    '<div class="p-shells">'+sh+'</div>'+
    '<div class="p-desc">'+(e.desc||('\u0639\u0646\u0635\u0631 '+e.ar+' \u0645\u0646 \u0641\u0635\u064a\u0644\u0629 '+cat.ar+'.'))+'</div>';
  document.getElementById('p-counter').textContent=presentIdx+' / 118';
  stopPresAnim();presentAnim=startAtom(document.getElementById('present-canvas'),e,99);
}
function stopPresAnim(){if(presentAnim){cancelAnimationFrame(presentAnim._raf);presentAnim=null;}}
function stopAtom(){if(atomAnim){cancelAnimationFrame(atomAnim._raf);atomAnim=null;}}
function startAtom(canvas,el,step){
  var ctx=canvas.getContext('2d');
  var W=canvas.width,H=canvas.height,cx=W/2,cy=H/2;
  var ang=0,raf;
  var total=Math.min(el.n+el.neutrons,60);
  var nuc=[];
  for(var i=0;i<total;i++){
    var a0=(i/total)*Math.PI*2+i*0.7;
    var r0=Math.max(4,Math.min(30,Math.sqrt(total)*2.2))*(0.35+0.65*((i*7919)%100/100));
    nuc.push({a:a0,r:r0,p:i<el.n});
  }
  var shells=el.shells;
  var maxR=Math.min(cx,cy)*0.86;
  var sR=shells.map(function(_,i){return maxR*(i+1)/shells.length;});
  function draw(){
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#030712';ctx.fillRect(0,0,W,H);
    shells.forEach(function(cnt,si){
      var r=sR[si];
      ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);
      ctx.strokeStyle='rgba(96,165,250,0.22)';ctx.setLineDash([4,4]);ctx.lineWidth=1;ctx.stroke();ctx.setLineDash([]);
      if(step<3)return;
      for(var ei=0;ei<cnt;ei++){
        var spd=0.45/(si+1);
        var ea=(ei/cnt)*Math.PI*2+ang*spd*(si%2?-1:1);
        var ex=cx+r*Math.cos(ea),ey=cy+r*Math.sin(ea);
        var g=ctx.createRadialGradient(ex,ey,0,ex,ey,8);
        g.addColorStop(0,'rgba(96,165,250,0.95)');g.addColorStop(1,'rgba(96,165,250,0)');
        ctx.beginPath();ctx.arc(ex,ey,8,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();
        ctx.beginPath();ctx.arc(ex,ey,3,0,Math.PI*2);ctx.fillStyle='#93c5fd';ctx.fill();
      }
    });
    if(step>=1){
      nuc.forEach(function(np){
        var nx=cx+np.r*Math.cos(np.a+ang*0.07);
        var ny=cy+np.r*Math.sin(np.a+ang*0.07);
        var col=step>=2?(np.p?'#ef4444':'#94a3b8'):'#6b7280';
        var gc=ctx.createRadialGradient(nx,ny,0,nx,ny,6);
        gc.addColorStop(0,col);gc.addColorStop(1,'rgba(0,0,0,0)');
        ctx.beginPath();ctx.arc(nx,ny,6,0,Math.PI*2);ctx.fillStyle=gc;ctx.fill();
        ctx.beginPath();ctx.arc(nx,ny,3.5,0,Math.PI*2);ctx.fillStyle=col;ctx.fill();
      });
    }
    ang+=0.013;
    raf=requestAnimationFrame(draw);
  }
  draw();
  return {_raf:raf,stop:function(){cancelAnimationFrame(raf);}};
}
function setStatus(t){document.getElementById('status-bar').textContent=t;}
function closeModal(id){document.getElementById(id).classList.add('hidden');stopAtom();clearSel();}
document.addEventListener('keydown',function(ev){
  var po=document.getElementById('present-overlay');
  if(!po.classList.contains('hidden')){
    if(ev.key==='ArrowRight'||ev.key==='ArrowDown')presentMove(1);
    else if(ev.key==='ArrowLeft'||ev.key==='ArrowUp')presentMove(-1);
    else if(ev.key==='Escape')closePresent();
  }
});
buildLegend();buildTable();
document.querySelectorAll('.mode-btn').forEach(function(b){b.addEventListener('click',function(){setMode(b.dataset.mode);});});
document.getElementById('btn-present').addEventListener('click',openPresent);
window.closeModal=closeModal;window.buildNext=buildNext;window.buildPrev=buildPrev;
window.closeQuiz=closeQuiz;window.startQuiz=startQuiz;window.nextQuestion=nextQuestion;
window.handleChoice=handleChoice;window.closeCompare=closeCompare;window.pickCompare=pickCompare;
window.closePresent=closePresent;window.presentMove=presentMove;
window.setMode=setMode;window.EL=EL;window.setStatus=setStatus;
window.searchEl=searchEl;window.filterCat=filterCat;
window.onEl=onEl;
window.toggleFullscreen=function(){
  var btn=document.getElementById('btn-fullscreen');
  if(!document.fullscreenElement&&!document.webkitFullscreenElement){
    var el=document.documentElement;
    if(el.requestFullscreen)el.requestFullscreen();
    else if(el.webkitRequestFullscreen)el.webkitRequestFullscreen();
    if(btn)btn.textContent='\u22c6\u22c6';
  }else{
    if(document.exitFullscreen)document.exitFullscreen();
    else if(document.webkitExitFullscreen)document.webkitExitFullscreen();
    if(btn)btn.textContent='\u26f6';
  }
};
document.addEventListener('fullscreenchange',function(){
  var btn=document.getElementById('btn-fullscreen');
  if(btn)btn.textContent=document.fullscreenElement?'\u22c6\u22c6':'\u26f6';
});
document.addEventListener('webkitfullscreenchange',function(){
  var btn=document.getElementById('btn-fullscreen');
  if(btn)btn.textContent=document.webkitFullscreenElement?'\u22c6\u22c6':'\u26f6';
});
})();`;

fs.writeFileSync('d:/VR Experience/js/main.js', js, {encoding:'utf8'});
console.log('Done! main.js size:', js.length);
