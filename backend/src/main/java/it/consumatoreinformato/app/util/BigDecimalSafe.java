package it.consumatoreinformato.app.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Configuration
public class BigDecimalSafe {

    static private Integer valueScale;
    static private Integer divideScale;
    static private RoundingMode roundingMode;

    public BigDecimalSafe(@Value("${app.value-scale}") Integer valueScale,
                          @Value("${app.divide-scale}") Integer divideScale,
                          @Value("${app.divide-rounding}") RoundingMode roundingMode) {
        BigDecimalSafe.valueScale = valueScale;
        BigDecimalSafe.divideScale = divideScale;
        BigDecimalSafe.roundingMode = roundingMode;
    }

    public static BigDecimal divide(BigDecimal dividend, BigDecimal divisor) {
        return dividend.divide(divisor, divideScale, roundingMode);
    }

    // All calculations should be done with as much scale/precision as possible, but end results for user consumption should
    // be rounded, because floating point precision isn't pretty
    public static BigDecimal round(BigDecimal decimal) {
        return decimal.setScale(valueScale, roundingMode);
    }

}
