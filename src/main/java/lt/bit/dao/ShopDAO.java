package lt.bit.dao;

import java.util.List;
import lt.bit.data.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author Lina
 */
public interface ShopDAO extends JpaRepository<Shop, Integer> {

    /**
     *
     * @return
     */
    @Query("select s from Shop s "
            + " order by name")
    public List<Shop> orderedListS();
}
