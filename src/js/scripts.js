(function() {
    'use strict';

    // Smooth scroll to inner links

    $('.inner-link').smoothScroll({
        offset: -59,
        speed: 800,
    });

    // Add scrolled class to nav

    $(window).scroll(function() {
        if ($(window).scrollTop() > 0) {
            $('nav').addClass('scrolled');
        } else {
            $('nav').removeClass('scrolled');
        }
    });

    // Set nav container height for fixed nav

    if (!$('nav').hasClass('transparent')) {
        $('.nav-container').css('min-height', $('nav').outerHeight());
    }

    // Mobile toggle

    $('.mobile-toggle').click(function() {
        $('nav').toggleClass('nav-open');
    });

    $('.menu li a').click(function() {
        if (
            $(this)
                .closest('nav')
                .hasClass('nav-open')
        ) {
            $(this)
                .closest('nav')
                .removeClass('nav-open');
        }
    });

    // Append .background-image-holder <img>'s as CSS backgrounds

    $('.background-image-holder').each(function() {
        var imgSrc = $(this)
            .children('img')
            .attr('src');
        $(this).css('background', 'url("' + imgSrc + '")');
        $(this)
            .children('img')
            .hide();
        $(this).css('background-position', '50% 50%');
    });

    // Fade in background images

    setTimeout(function() {
        $('.background-image-holder').each(function() {
            $(this).addClass('fadeIn');
        });
        $('.header.fadeContent').each(function() {
            $(this).addClass('fadeIn');
        });
    }, 200);

    // Image fade on story 2 element

    $('.story-2 img').mouseenter(function() {
        $(this).removeClass('fade');
        $(this)
            .siblings()
            .addClass('fade');
    });

    $('.story-2 img').mouseleave(function() {
        $(this)
            .closest('.row')
            .find('img')
            .removeClass('fade');
    });

    // Radio box controls

    $('.radio-holder').click(function() {
        $(this)
            .siblings()
            .find('input')
            .prop('checked', false);
        $(this)
            .find('input')
            .prop('checked', true);
        $(this)
            .closest('.radio-group')
            .find('.radio-holder')
            .removeClass('checked');
        $(this).addClass('checked');
    });

    // Instagram Feed

    // Contact form code

    $('form.form-email').submit(function(e) {
        var thisForm = $(this).closest('form.form-email'),
            error = 0,
            originalError = thisForm.attr('original-error');

        if (
            typeof originalError !== typeof undefined &&
            originalError !== false
        ) {
            thisForm.find('.form-error').text(originalError);
        }

        error = validateFields(thisForm);

        if (error === 1) {
            e.preventDefault();
            $(this)
                .closest('form')
                .find('.form-error')
                .fadeIn(200);
            setTimeout(function() {
                $(thisForm)
                    .find('.form-error')
                    .fadeOut(500);
            }, 3000);
        }
    });

    $('.validate-required, .validate-email').on('blur change', function() {
        validateFields($(this).closest('form'));
    });

    $('form').each(function() {
        if ($(this).find('.form-error').length) {
            $(this).attr(
                'original-error',
                $(this)
                    .find('.form-error')
                    .text()
            );
        }
    });

    function validateFields(form) {
        var name, error, originalErrorMessage;

        $(form)
            .find('.validate-required[type="checkbox"]')
            .each(function() {
                if (
                    !$('[name="' + $(this).attr('name') + '"]:checked').length
                ) {
                    error = 1;
                    name = $(this)
                        .attr('name')
                        .replace('[]', '');
                    form
                        .find('.form-error')
                        .text('Please tick at least one ' + name + ' box.');
                }
            });

        $(form)
            .find('.validate-required')
            .each(function() {
                if ($(this).val() === '') {
                    $(this).addClass('field-error');
                    error = 1;
                } else {
                    $(this).removeClass('field-error');
                }
            });

        $(form)
            .find('.validate-email')
            .each(function() {
                if (!/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val())) {
                    $(this).addClass('field-error');
                    error = 1;
                } else {
                    $(this).removeClass('field-error');
                }
            });

        if (!form.find('.field-error').length) {
            form.find('.form-error').fadeOut(1000);
        }

        return error;
    }
})();
