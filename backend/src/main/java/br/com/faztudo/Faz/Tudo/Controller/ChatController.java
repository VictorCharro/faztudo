package br.com.faztudo.Faz.Tudo.Controller;

import br.com.faztudo.Faz.Tudo.Services.ChatService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
@CrossOrigin(origins = "*")
@Data
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping
    public String conversar(@RequestBody String mensagem) {
        return chatService.enviarMensagem(mensagem);
    }
}
