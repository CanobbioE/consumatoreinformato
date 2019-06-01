package it.consumatoreinformato.app.rest;

import com.stripe.exception.StripeException;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import it.consumatoreinformato.app.dto.payments.requests.PaymentRequestDto;
import it.consumatoreinformato.app.dto.payments.responses.PaymentStatusDto;
import it.consumatoreinformato.app.exception.*;
import it.consumatoreinformato.app.service.PaymentService;
import it.consumatoreinformato.app.service.PaymentServiceImpl;
import it.consumatoreinformato.app.util.SecurityHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/payments")
public class PaymentsController {

    private PaymentService paymentService;
    private SecurityHandler securityHandler;

    @Autowired
    public PaymentsController(PaymentServiceImpl paymentService, SecurityHandler securityHandler) {
        this.paymentService = paymentService;
        this.securityHandler = securityHandler;
    }

    @ApiOperation(value = "Pay the subscription", notes = "Pay the yearly subscription", response = PaymentStatusDto.class, httpMethod = "POST")
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    @PostMapping("/pay")
    public ResponseEntity<PaymentStatusDto> pay(@Valid @RequestBody PaymentRequestDto paymentRequestDto)
            throws PaymentFailedException, StripeException, NotAuthenticatedException, UserNotFoundException {
        PaymentStatusDto paymentStatusDto = paymentService.pay(
                securityHandler.getPrincipalAsUser(),
                paymentRequestDto.getStripeToken());

        return ResponseEntity.ok(paymentStatusDto);
    }

}
