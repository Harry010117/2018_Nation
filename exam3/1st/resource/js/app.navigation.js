// page class
class Navigation {

	// instance Constructor
	constructor () { }

	// set static variable
	static init () {

		// jQuery selector minimization
		const page = $('page')
		const url = new URL(location.href) || null
		Navigation.main    = $('.main')
		Navigation.sub     = $('.sub')
		Navigation.page    = page
		Navigation.gnb     = $('.gnb')
		Navigation.len     = Navigation.gnb.find('li').length
		Navigation.section = Navigation.page.find('>section')
		Navigation.current = url && url.serachParams.get('page') !== null ? parseInt(url.serachParams.get(page)) : -1

		if (Navigation.current == -1) {
			Navigation.main.addClass('active')
			new Animation({obj:$('.main, .arrow')})
		}else {
			Navigation.sub.addClass('active')
			Navigation.section.eq(Navigation.nowPage).('active')
			new Animation({obj:$('.sub-default, .arrow, .page>section.active')})
		}
	}

	// go to main page
	static goToMain () {
		const sub = Navigation.sub
		const main = Navigation.main
		const target = sub.find('.page>section, .sub-default')
		const closeSub = () => {
			sub.fadeOut(500, () => {
				target.removeClass('active').removeAttr('style')
				sub.removeClass('active').removeAttr('style')
				main.fadeIn(300, () => {
					main.addClass('active')
					new Animation({obj:main})
				})
			})
		}
	}

	// go to selected sub page
	static goToPage () {Navigation.goToPageReal($(this).index())}

	// go to page
	static goToPageReal (num) {
		// variable set
		const main = Navigation.main,
		sub  = Navigation.sub,
		page = Navigation.page,
		gnb  = Navigation.gnb

		if (Navigation.nowPage === -1) {
			main.removeClass('active')
			sub.addClass('active')
		}

		page.find('>section.active').removeClass('active')
		page.find('>section').eq(num).addClass('active')
		gnb.find('li.active').removeClass('active')
		gnb.find('li').eq(num).addClass('active')
		Navigation.nowPage = num
	}

	// go to selected sub page
	static goToArrow () {
		// variable set 
		const _this = $(this),
		len   = Navigation.len
		let   num   = Navigation.nowPage
		num = _this.hasClass('left') ? num - 1 : num + 1
		if (num == -1 || num >= len) {
			Navigation.goToMain()
			return
		} else if (num < -1) {
			num = len - 1
		}
		Navigation.goToPageReal(num)
	}
}