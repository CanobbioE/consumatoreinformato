package it.consumatoreinformato.app.config;

import org.modelmapper.Condition;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperHelper {

    @Bean
    static ModelMapper modelMapper() {
        ModelMapper res=new ModelMapper();
        Condition skipNulls = context -> context.getSource()!=null;
        res.getConfiguration().setPropertyCondition(skipNulls);
        res.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        customTypeMaps(res);
        return res;
    }

    private static void customTypeMaps(ModelMapper mapper) {
        //Manual typemaps that don't get matched automatically
    }

    public static <T> T mapToNew(Object input, Class<T> out) {
        if (input==null) return null;
        return modelMapper().map(input,out);
    }
    public static void mapToExisting(Object input, Object out) {
        modelMapper().map(input,out);
    }

}
