package lt.bit.controller;

import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import lt.bit.data.Product;
import lt.bit.data.Shop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lt.bit.dao.ShopDAO;
import lt.bit.dao.ProductDAO;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 *
 * @author Lina
 */
@RestController
@RequestMapping("/rest/shops")
public class ControllerRestS {

    @Autowired
    private ShopDAO shopDAO;
    @Autowired
    private ProductDAO productDAO;

    /**
     *
     * @return
     */
    @GetMapping
    public List<Shop> listS() {
        List<Shop> list = shopDAO.findAll();
        System.out.println("..................................................");
        System.out.println("list:" + list);
        return shopDAO.orderedListS();
    }
    @GetMapping("{idS}")
    public Shop getS(@PathVariable(value="idS") Integer idS){    
        return shopDAO.getOne(idS);
    }
    
    @Transactional
    @DeleteMapping("{idS}")
    public void deleteS(@PathVariable(value="idS") Integer idS){    
       shopDAO.deleteById(idS);
    }
    
    
    @Transactional       
    @PostMapping
    public Shop addS(@RequestBody Shop s){     //reiskia kad gauni visa streema, springas praleidzia per jacksona, kuris sukuria viska is narsykles
        System.out.println("************************");
        System.out.println("s: "+ s);
        shopDAO.save(s);
       return s;
    }
    
    @Transactional
    @PutMapping("{idS}")    
    public Shop updateS(@PathVariable(value="idS") Integer idS, @RequestBody Shop ns){  
       Shop s= shopDAO.getOne(idS);
       s.setName(ns.getName());
       s.setAddress(ns.getAddress());     
//       personDAO.save(p);
       return ns; // ??
    } 
    /**
     *
     * @return
     */
//    @GetMapping("/vidurkis")
//    public double vidurkis() {
//        List<Pazymiai> list = pazymiaiDAO.findAll();
//        int sum = 0;
//        double avg = 0;
//
//        for (Pazymiai pazymiai : list) {
//            int pazymys = pazymiai.getPazymys();
//            Date d = pazymiai.getData();
//            Calendar cal = Calendar.getInstance();
//            cal.setTime(d);
//            System.out.println(cal.getTime());
//            sum += pazymys;
//        }
//        avg = (double) sum / list.size();
//        System.out.println("kurso vidurkis yra : " + avg);
//        return avg;
//    }
}
