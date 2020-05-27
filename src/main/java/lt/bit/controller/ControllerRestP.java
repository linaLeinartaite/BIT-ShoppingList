package lt.bit.controller;

import java.util.List;
import lt.bit.data.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lt.bit.dao.ShopDAO;
import lt.bit.dao.ProductDAO;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 *
 * @author Lina
 */
@RestController
@RequestMapping("/rest/shops/{idS}/products")
public class ControllerRestP {

    @Autowired
    private ProductDAO productDAO;
    @Autowired
    private ShopDAO shopDAO;

    /**
     *
     * @param idS
     * @return
     */
    @GetMapping
    public List<Product> orderedListP(@PathVariable("idS") Integer idS) {
        return productDAO.orderedListP(idS);
    }

    @GetMapping("{idP}")
    public Product getP(@PathVariable(value = "idP") Integer idP) {
        return productDAO.getOne(idP);
    }

    @Transactional
    @DeleteMapping("{idP}")
    public void deleteP(@PathVariable(value = "idP") Integer idP) {
        productDAO.deleteById(idP);
    }

    @Transactional
    @PostMapping
    public Product addP(@PathVariable(value="idS") Integer idS, @RequestBody Product np){
        np.setShop(shopDAO.getOne(idS)); //sita pridejau ir ta path variable virsuje pridejau
        productDAO.save(np);
        System.out.println(".................");
        System.out.println("p" + np);
        return np;
    }
    
    @Transactional
    @PutMapping("{idP}")    
    public Product updateP(@PathVariable(value="idP") Integer idP, @RequestBody Product np){  
       Product p= productDAO.getOne(idP);
       p.setName(np.getName());
       p.setDescription(np.getDescription()); 
       p.setPrice(np.getPrice());
       p.setQuantity(np.getQuantity());
//       personDAO.save(p);
       return p; // ??
    } 
}
