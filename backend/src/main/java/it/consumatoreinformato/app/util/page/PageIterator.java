package it.consumatoreinformato.app.util.page;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Iterator;
import java.util.function.Function;

/**
 * PageIterator is used to iterate seamlessly over page provider, no fuss.
 *
 * @param <E> the type of the data in the pages fetched.
 */
public class PageIterator<E> implements Iterator<E> {

    private Function<Pageable, Page<E>> pageFetcher;
    private Iterator<E> elementIterator;
    private Page<E> currentPage;
    private Pageable pageRequest;

    /**
     * The class constructor.
     *
     * @param pageFetcher a function that specifies how to fetch a page.
     * @param pageSize    the size of each page fetched.
     */
    public PageIterator(Function<Pageable, Page<E>> pageFetcher, Integer pageSize) {
        this.pageFetcher = pageFetcher;
        this.pageRequest = PageRequest.of(0, pageSize);
        fetchPage();
    }

    /**
     * Use the specified fetcher function to fetch the next page.
     */
    private void fetchPage() {
        currentPage = pageFetcher.apply(pageRequest);
        elementIterator = currentPage.iterator();
    }

    /**
     * Gets next element in the pageIterator and fetches the next page if needed.
     *
     * @return the next element of the currentPage.iterator()
     */
    public E next() {
        if (!elementIterator.hasNext() && currentPage.hasNext()) {
            pageRequest = currentPage.nextPageable();
            fetchPage();
        }
        return elementIterator.next();
    }

    /**
     * @return true if there is another element or another page to fetch.
     */
    public boolean hasNext() {
        return elementIterator.hasNext() || currentPage.hasNext();
    }
}
