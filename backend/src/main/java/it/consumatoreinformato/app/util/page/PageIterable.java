package it.consumatoreinformato.app.util.page;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Iterator;
import java.util.function.Function;

/**
 * PageIterable is a wrapper for the PageIterator, it is used to iterate
 * seamlessly over page provider using the for each notation
 * e.g. for(E item : pageIterable) {}
 *
 * @param <E> the type of the data in the pages fetched.
 */
public class PageIterable<E> implements Iterable<E> {

    private Iterator<E> pageIterator;

    /**
     * The class constructor.
     *
     * @param pageFetcher a function that specifies how to fetch a page.
     * @param pageSize    the size of each page fetched.
     */
    public PageIterable(Function<Pageable, Page<E>> pageFetcher, Integer pageSize) {
        this.pageIterator = new PageIterator<E>(pageFetcher, pageSize);
    }


    /**
     * @return the underlying pageIterator as an Iterator
     */
    @Override
    public Iterator<E> iterator() {
        return this.pageIterator;
    }
}
