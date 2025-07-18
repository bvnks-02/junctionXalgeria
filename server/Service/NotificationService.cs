using System;
using System.Linq;
using Models;
using Microsoft.EntityFrameworkCore;
using Data;

using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

public class NotificationService : INotificationService
{
    public async Task Notify(Alert alert)
    {
        Console.WriteLine($"[Notify] Alert for Pond {alert.PondId}: {alert.Parameter} = {alert.Value} @ {alert.Timestamp}");


        var httpClient = new HttpClient
        {
            BaseAddress = new Uri("https://api.infobip.com"),
            Timeout = TimeSpan.FromSeconds(30)
        };

        httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("App", "01584902f2fbcfbfef56850a8fc90135-e078e91e-9b82-448a-8a5f-b5288fbae3c0");

        httpClient.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));

        var payload = new
        {
            messages = new[]
            {
                new
                {
                    // destinations = new[] { new { to = "213675706769" } },
                    destinations = new[] { new { to = "213555052499" } },
                    from = "447491163443",
                    text = "Congratulations on sending your first message. Go ahead and check the delivery report in the next step."
                }
            }
        };

        var json = JsonSerializer.Serialize(payload);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        var response = await httpClient.PostAsync("/sms/2/text/advanced", content);
        var responseContent = await response.Content.ReadAsStringAsync();

        Console.WriteLine(responseContent);

        Console.WriteLine($"SMS To houdaifa");

    }
}
