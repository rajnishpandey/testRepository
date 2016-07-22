'use strict';

App.controller('AppController', [
		'$scope',
		'UserService',
		function($scope, UserService) {
			var self = this;
			self.user = {
				id : null,
				title : '',
				artist : '',
				releaseYear : ''
			};
			self.users = [];

			self.fetchAllUsers = function() {
				UserService.fetchAllUsers().then(function(d) {
					self.users = d;
				}, function(errResponse) {
					console.error('Error while fetching Currencies');
				});
			};

			self.fetchAllUsers();

			self.deleteUser = function(id) {
				UserService.deleteUser(id).then(self.fetchAllUsers,
						function(errResponse) {
							console.error('Error while deleting User.');
						});
			};

			self.remove = function(id) {
				self.deleteUser(id);
			};

			self.createUser = function(user) {
				console.log('createUser');
				UserService.createUser(user).then(self.fetchAllUsers,
						function(errResponse) {
							console.error('Error while creating User.');
						}, function(d) {
							console.log('createUser inside');
							self.users = d;
						}, function(errResponse) {
							console.error('Error while fetching Currencies');
						});
			};

			self.updateUser = function(user, id) {
				var edit = document.getElementById("edit");
				var add = document.getElementById("add");
				edit.style.display = "none";
				add.style.display ="block";
				UserService.updateUser(user, id).then(self.fetchAllUsers,
						function(errResponse) {
							console.error('Error while updating User.');
						}, function(d) {
							console.log('createUser inside');
							self.users = d;
						}, function(errResponse) {
							console.error('Error while fetching Currencies');
						});
			};

			self.submit = function() {
				console.log('submit .....');
				if (self.user.id === null) {
					console.log('Saving New User', self.user, self.user.id,
							self.user.title);
					self.createUser(self.user);
				} else {
					self.updateUser(self.user, self.user.id);
					console.log('User updated with id ', self.user.id);
				}
				self.reset();
			};

			self.edit = function(id) {
				var edit = document.getElementById("edit");
				var add = document.getElementById("add");
				edit.style.display = "block";
				add.style.display = "none";
				console.log('id to be edited', id);
				for (var i = 0; i < self.users.length; i++) {
					if (self.users[i].id === id) {
						self.user = angular.copy(self.users[i]);
						break;
					}
				}

			};

			self.reset = function() {
				self.user = {
					id : null,
					title : '',
					artist : '',
					releaseYear : ''
				};
			}

		} ]);