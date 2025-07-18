using System;
using System.Linq;
using Models;
using Microsoft.EntityFrameworkCore;
using Data;

public class NotificationServiceMock : INotificationService
{
    public async Task Notify(Alert alert)
    {
        Console.WriteLine($"[Notify] Alert for Pond {alert.PondId}: {alert.Parameter} = {alert.Value} @ {alert.Timestamp}");
    }
}
