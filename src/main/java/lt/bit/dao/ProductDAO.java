package lt.bit.dao;

import java.util.List;
import lt.bit.data.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Lina
 */
public interface ProductDAO extends JpaRepository<Product, Integer> {

    /**
     *
     * @return
     */
    @Query("select p from Product p")
    public List<Product> listP();

    /**
     *
     * @param idS
     * @return
     */
    @Query("select p from Product p where p.shop.id = :idS")
    public List<Product> orderedListP(@Param("idS") Integer idS);
}
