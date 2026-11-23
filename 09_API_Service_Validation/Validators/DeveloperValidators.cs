using FluentValidation;
using GamesApi.Dtos;

namespace GamesApi.Validators;

// Базові правила для будь-якого DTO розробника
public abstract class DeveloperInputValidator<T> : AbstractValidator<T> where T : IDeveloperInput
{
    protected DeveloperInputValidator()
    {
        // Для кожного поля показуємо тільки першу помилку
        RuleLevelCascadeMode = CascadeMode.Stop;

        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Назва обов'язкова")
            .MinimumLength(2).WithMessage("Назва - мінімум 2 символи")
            .MaximumLength(100).WithMessage("Назва - максимум 100 символів");

        RuleFor(x => x.Country)
            .NotEmpty().WithMessage("Країна обов'язкова")
            .MaximumLength(60).WithMessage("Країна - максимум 60 символів")
            .Matches(@"^[\p{L}\s\-]+$").WithMessage("Країна може містити тільки літери, пробіли та дефіс");

        RuleFor(x => x.FoundedYear)
            .InclusiveBetween(1850, DateTime.UtcNow.Year)
            .WithMessage($"Рік заснування має бути від 1850 до {DateTime.UtcNow.Year}");

        RuleFor(x => x.Website)
            .MaximumLength(200).WithMessage("Сайт - максимум 200 символів")
            .Must(BeValidUrl).WithMessage("Сайт має бути коректним http/https посиланням")
            .When(x => !string.IsNullOrWhiteSpace(x.Website));
    }

    private static bool BeValidUrl(string? url) =>
        Uri.TryCreate(url, UriKind.Absolute, out var uri) &&
        (uri.Scheme == Uri.UriSchemeHttp || uri.Scheme == Uri.UriSchemeHttps);
}

public class CreateDeveloperDtoValidator : DeveloperInputValidator<CreateDeveloperDto>;

public class UpdateDeveloperDtoValidator : DeveloperInputValidator<UpdateDeveloperDto>;
